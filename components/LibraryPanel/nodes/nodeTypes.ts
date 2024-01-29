import AssistantAgent from '@/components/LibraryPanel/nodes/autogen/AssistantAgent';
import CustomFunction from '@/components/LibraryPanel/nodes/autogen/CustomFunction';
import GPTAssistantAgent from '@/components/LibraryPanel/nodes/autogen/GPTAssistantAgent';
import GroupChat from '@/components/LibraryPanel/nodes/autogen/GroupChat';
import UserProxy from '@/components/LibraryPanel/nodes/autogen/UserProxy';
import React from 'react';
import { NodeProps, Node as ReactFlowNode } from 'reactflow';

export enum XForceNodesEnum {
  USER_PROXY = 'USER_PROXY',
  GROUP_CHAT = 'GROUP_CHAT',
  GPT_ASSISTANT_AGENT = 'GPT_ASSISTANT_AGENT',
  CUSTOM_FUNCTION = 'CUSTOM_FUNCTION',
  ASSISTANT_AGENT = 'ASSISTANT_AGENT',
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
        input: [XForceNodesEnum.USER_PROXY, XForceNodesEnum.GPT_ASSISTANT_AGENT, XForceNodesEnum.ASSISTANT_AGENT],
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
        input: [XForceNodesEnum.CUSTOM_FUNCTION],
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
  ASSISTANT_AGENT: {
    id: XForceNodesEnum.ASSISTANT_AGENT,
    type: XForceNodesEnum.ASSISTANT_AGENT,
    dragHandle: `.${XForceNodesEnum.ASSISTANT_AGENT}`,
    data: {
      connectivity: {
        input: null,
        output: [XForceNodesEnum.GROUP_CHAT],
      },
    },
  },
};
export const CUSTOM_X_FORCE_NODES: { [_ in XForceNodesEnum]: React.ComponentType<NodeProps> } = {
  USER_PROXY: UserProxy,
  GROUP_CHAT: GroupChat,
  GPT_ASSISTANT_AGENT: GPTAssistantAgent,
  CUSTOM_FUNCTION: CustomFunction,
  ASSISTANT_AGENT: AssistantAgent,
};
