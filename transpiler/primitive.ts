import { XForceNodesEnum } from '@/components/LibraryPanel/nodes/nodeTypes';
import { extractNodeName } from '@/utils/nodeUtils';
import { Edge as ReactFlowEdge, Node as ReactFlowNode } from 'reactflow';

const CODE_SKELETON = (c: string) => {
  return `import os
import autogen
from autogen.agentchat.contrib.gpt_assistant_agent import GPTAssistantAgent
from autogen import UserProxyAgent

from dotenv import load_dotenv

load_dotenv()

# ----------------- #

${c}
`;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NODE_TO_CODE_SCHEMA: { [k in XForceNodesEnum]: (params: any) => string } = {
  GROUP_CHAT: ({
    variableName,
    maxRounds,
    agentSelection,
    agents,
    configListVarName,
  }: {
    variableName: string;
    maxRounds: number;
    agentSelection: string;
    agents: string[];
    configListVarName: string;
  }) =>
    `${variableName} = autogen.GroupChat(agents=[${agents}], messages=[], max_round=${
      maxRounds || 15
    }, speaker_selection_method="${agentSelection || 'auto'}")
${variableName}_manager = autogen.GroupChatManager(groupchat=${variableName}, llm_config = {"config_list": ${configListVarName}})`,
  USER_PROXY: ({ variableName }: { variableName: string }) =>
    `${variableName} = UserProxyAgent(name="${variableName}", human_input_mode="ALWAYS", max_consecutive_auto_reply=1)`,
  GPT_ASSISTANT_AGENT: ({
    variableName,
    OAIId,
    funcMap,
    configListVarName,
  }: {
    variableName: string;
    OAIId: string;
    configListVarName: string;
    funcMap?: string;
  }) => `${variableName} = GPTAssistantAgent(name="${variableName}", llm_config = {"config_list": ${
    configListVarName || 'None'
  }, "assistant_id":"${OAIId}"})
${funcMap ? `${variableName}.register_function(function_map=${funcMap || 'None'})` : ''}`,
  CUSTOM_FUNCTION: ({ func }: { func: string }) => `${func || ''}`,
  LLM_OPENAI: ({ i, model, apiKey }: { i: number; model: string; apiKey: string }) =>
    `openai_config_${i} = [{'model': '${model || 'gpt-3.5-turbo-1106'}', 'api_key': '${
      apiKey || '<please fill here with your api key>'
    }'}]`,
};
export const CODE_BUILDER = (nodes: ReactFlowNode[], edges: ReactFlowEdge[]) => {
  const codes: string[] = [];
  const m = new Map();

  // nodes
  const customFuncs = nodes.filter((node) => node.type === XForceNodesEnum.CUSTOM_FUNCTION);
  const llmConfigs = nodes.filter((node) => node.type === XForceNodesEnum.LLM_OPENAI);
  const gptAssistants = nodes.filter((node) => node.type === XForceNodesEnum.GPT_ASSISTANT_AGENT);
  const userProxies = nodes.filter((node) => node.type === XForceNodesEnum.USER_PROXY);
  const groupChats = nodes.filter((node) => node.type === XForceNodesEnum.GROUP_CHAT);

  customFuncs.forEach((el) => {
    const regex = /def\s+([a-zA-Z_]\w*)\s*\(/g;
    let match;
    const functionNames = new Set();
    while ((match = regex.exec(el.data?.func)) !== null) {
      functionNames.add(match[1]);
    }

    m.set(el.id, Array.from(functionNames));
    const key = el.type as keyof typeof XForceNodesEnum;
    const codeblock = NODE_TO_CODE_SCHEMA[key]?.(el.data || undefined);
    codes.push(codeblock);
  });

  llmConfigs.forEach((el, index) => {
    m.set(el.id, `openai_config_${index}`);
    const key = el.type as keyof typeof XForceNodesEnum;
    const codeblock = NODE_TO_CODE_SCHEMA[key]?.({ ...el.data, i: index } || undefined);
    codes.push(codeblock);
  });

  gptAssistants.forEach((el) => {
    m.set(el.id, el?.data?.variableName);
    const key = el.type as keyof typeof XForceNodesEnum;
    const connectedFuncNames = edges
      .filter(
        (e) =>
          extractNodeName(e.source || '') === XForceNodesEnum.CUSTOM_FUNCTION &&
          extractNodeName(e.target || '') === XForceNodesEnum.GPT_ASSISTANT_AGENT,
      )
      .map((e) => {
        const funcNames = m.get(e.source);
        return funcNames.map((f: string) => `"${f}": ${f}`);
      });
    const functionMap = `{${connectedFuncNames}}`;
    const connectedLLMConfig = edges.find(
      (e) =>
        extractNodeName(e.source || '') === XForceNodesEnum.LLM_OPENAI &&
        extractNodeName(e.target || '') === XForceNodesEnum.GPT_ASSISTANT_AGENT,
    );
    const llmConfigVarName = m.get(connectedLLMConfig?.source);

    const codeblock = NODE_TO_CODE_SCHEMA[key]?.(
      { ...el.data, funcMap: functionMap, configListVarName: llmConfigVarName } || undefined,
    );
    codes.push(codeblock);
  });

  userProxies.forEach((el) => {
    m.set(el.id, el?.data?.variableName);
    const key = el.type as keyof typeof XForceNodesEnum;
    const codeblock = NODE_TO_CODE_SCHEMA[key]?.(el.data || undefined);
    codes.push(codeblock);
  });

  groupChats.forEach((el) => {
    m.set(el.id, el?.data?.variableName);

    const agents = edges
      .filter(
        (e) =>
          extractNodeName(e.source || '') !== XForceNodesEnum.LLM_OPENAI &&
          extractNodeName(e.target || '') === XForceNodesEnum.GROUP_CHAT,
      )
      .map((e) => m.get(e.source));

    const connectedLLMConfig = edges.find(
      (e) =>
        extractNodeName(e.source || '') === XForceNodesEnum.LLM_OPENAI &&
        extractNodeName(e.target || '') === XForceNodesEnum.GPT_ASSISTANT_AGENT,
    );
    const llmConfigVarName = m.get(connectedLLMConfig?.source);
    const key = el.type as keyof typeof XForceNodesEnum;
    const codeblock = NODE_TO_CODE_SCHEMA[key]?.(
      { ...el.data, agents, configListVarName: llmConfigVarName } || undefined,
    );
    codes.push(codeblock);
  });

  userProxies.forEach((el) => {
    const connectedGCs = edges.filter(
      (e) =>
        extractNodeName(e.source || '') === XForceNodesEnum.USER_PROXY &&
        extractNodeName(e.target || '') === XForceNodesEnum.GROUP_CHAT,
    );
    connectedGCs.forEach((gc) => {
      const gcVarName = m.get(gc?.target);
      const codeblock = `${el.data?.variableName}.initiate_chat(${gcVarName}_manager,  message="${el?.data?.initialPrompt}")`;
      codes.push(codeblock);
    });
  });

  // build code
  return CODE_SKELETON(codes.join('\n'));
};
