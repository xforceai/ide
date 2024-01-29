import FieldSchema, { InputField, SelectField } from '@/components/LibraryPanel/nodes/Fields';
import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/LibraryPanel/nodes/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { OAIModelsEnum } from '@/types/enum';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';
import { XForceNodesEnum } from '../nodeTypes';

const AssistantAgent: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { addNodeData } = useDnDStore();
  const { getNode } = useReactFlow();

  const data = getNode(props.id)?.data;
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const onAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    addNodeData(props.id, { variableName: val });
  };

  const onSystemPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    addNodeData(props.id, { systemPrompt: val });
  };

  return (
    <div className="rounded-sm border border-gray-200 bg-white w-80">
      <div
        className={`${XForceNodesEnum.ASSISTANT_AGENT} flex justify-between items-center border-b border-gray-200 py-2`}
      >
        <div className="font-bold ml-2">AssistantAgent</div>
        <InformationCircleIcon
          width={24}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="AssistantAgent" />}
            content={
              <DefaultContent
                name="AssistantAgent"
                description="is a subclass of ConversableAgent configured with a default system message. The default system message is designed to solve a task with LLM, including suggesting python code blocks and debugging."
                docTeaser={`Agent Name: Name of the agent. (ex: my_gpt_assistant_agent_1)\n\nSystem Message: A message for the ChatCompletion inference. LLM: Any large language model provided by OpenAI for the agent to consume.`}
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="pb-2 px-2 bg-gray-50">
        <FieldSchema
          field={
            <InputField
              label="Agent Name"
              placeholder="my_agent"
              required
              onChange={onAgentNameChange}
              type="text"
              value={data?.variableName}
            />
          }
          errors={errors?.[props.id]?.variableName}
        />
        <FieldSchema
          field={
            <InputField
              label="System Message"
              onChange={onSystemPromptChange}
              type="text"
              value={data?.systemPrompt}
              placeholder='Solve tasks using your coding and language skills. In the following cases, suggest python code (in a python coding block) or shell script (in a sh coding block) for the user to execute."'
            />
          }
          errors={errors?.[props.id]?.systemPrompt}
        />
        <FieldSchema
          field={
            <SelectField
              label="LLM"
              selected={data?.selectedModel || OAIModelsEnum.GPT_3_5_TURBO}
              onChange={(e) => addNodeData(props.id, { selectedModel: e.target.value })}
              options={Object.values(OAIModelsEnum)}
            />
          }
          errors={errors?.[props.id]?.selectedModel}
        />
      </div>
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default AssistantAgent;
