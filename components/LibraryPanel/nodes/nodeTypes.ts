import CustomFunction from '@/components/LibraryPanel/nodes/autogen/CustomFunction';
import GPTAssistantAgent from '@/components/LibraryPanel/nodes/autogen/GPTAssistantAgent';
import GroupChat from '@/components/LibraryPanel/nodes/autogen/GroupChat';
import UserProxy from '@/components/LibraryPanel/nodes/autogen/UserProxy';
import OpenAI from '@/components/LibraryPanel/nodes/autogen/llm/OpenAI';
import React from 'react';
import { NodeProps, Node as ReactFlowNode } from 'reactflow';

export enum XForceNodesEnum {
  USER_PROXY = 'USER_PROXY',
  GROUP_CHAT = 'GROUP_CHAT',
  GPT_ASSISTANT_AGENT = 'GPT_ASSISTANT_AGENT',
  CUSTOM_FUNCTION = 'CUSTOM_FUNCTION',
  LLM_OPENAI = 'LLM_OPENAI',
}
export type XForceNodeDataType = {
  connectivity: {
    input: XForceNodesEnum[] | null;
    output: XForceNodesEnum[] | null;
  };
};
export type XForceNodeType = Omit<ReactFlowNode<XForceNodeDataType>, 'position'>;

export const X_FORCE_NODES: { [k in XForceNodesEnum]: XForceNodeType } = {
  GROUP_CHAT: {
    id: XForceNodesEnum.GROUP_CHAT,
    type: XForceNodesEnum.GROUP_CHAT,
    dragHandle: `.${XForceNodesEnum.GROUP_CHAT}`,
    data: {
      connectivity: {
        input: [XForceNodesEnum.USER_PROXY, XForceNodesEnum.GPT_ASSISTANT_AGENT, XForceNodesEnum.LLM_OPENAI],
        output: null,
      },
    },
  },
  USER_PROXY: {
    id: XForceNodesEnum.USER_PROXY,
    type: XForceNodesEnum.USER_PROXY,
    dragHandle: `.${XForceNodesEnum.USER_PROXY}`,
    data: {
      connectivity: {
        input: null,
        output: [XForceNodesEnum.GROUP_CHAT],
      },
    },
  },
  GPT_ASSISTANT_AGENT: {
    id: XForceNodesEnum.GPT_ASSISTANT_AGENT,
    type: XForceNodesEnum.GPT_ASSISTANT_AGENT,
    dragHandle: `.${XForceNodesEnum.GPT_ASSISTANT_AGENT}`,
    data: {
      connectivity: {
        input: [XForceNodesEnum.CUSTOM_FUNCTION, XForceNodesEnum.LLM_OPENAI],
        output: [XForceNodesEnum.GROUP_CHAT],
      },
    },
  },
  CUSTOM_FUNCTION: {
    id: XForceNodesEnum.CUSTOM_FUNCTION,
    type: XForceNodesEnum.CUSTOM_FUNCTION,
    dragHandle: `.${XForceNodesEnum.CUSTOM_FUNCTION}`,
    data: {
      connectivity: {
        input: null,
        output: [XForceNodesEnum.GPT_ASSISTANT_AGENT],
      },
    },
  },
  LLM_OPENAI: {
    id: XForceNodesEnum.LLM_OPENAI,
    type: XForceNodesEnum.LLM_OPENAI,
    dragHandle: `.${XForceNodesEnum.LLM_OPENAI}`,
    data: {
      connectivity: {
        input: null,
        output: [XForceNodesEnum.GPT_ASSISTANT_AGENT, XForceNodesEnum.GROUP_CHAT],
      },
    },
  },
};
export const CUSTOM_X_FORCE_NODES: { [_ in XForceNodesEnum]: React.ComponentType<NodeProps> } = {
  USER_PROXY: UserProxy,
  GROUP_CHAT: GroupChat,
  GPT_ASSISTANT_AGENT: GPTAssistantAgent,
  CUSTOM_FUNCTION: CustomFunction,
  LLM_OPENAI: OpenAI,
};
