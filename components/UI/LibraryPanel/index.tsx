import NodeSkeleton from '@/components/UI/LibraryPanel/NodeSkeleton';
import { XForceNodeType, X_FORCE_NODES } from '@/components/UI/LibraryPanel/nodes/nodeTypes';
import Tree from '@/components/libTree/Tree';
import { TreeProps } from '@/components/libTree/types';
import Image from 'next/image';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const PANEL_WIDTH = 320;

const LibraryPanel = () => {
  const onDragStart = (event: React.DragEvent, node: XForceNodeType) => {
    const newNode = { ...node, id: `${node.id}__${uuidv4()}` };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(newNode));
    event.dataTransfer.effectAllowed = 'move';
  };

  const treeData: TreeProps<object>['data'] = [
    {
      id: 'n1',
      name: 'Configs',
      initiallyExpanded: true,
      draggable: false,
      children: [
        {
          id: 'n1',
          name: 'OpenAI',
          onDrag: (event) => onDragStart(event, X_FORCE_NODES.LLM_OPENAI),
          jsxElement: (
            <NodeSkeleton
              name="OpenAI"
              content={
                <div className="text-sm">
                  <span>
                    Provide foundational models from{' '}
                    <span className="bg-gray-100 px-1 text-gray-700 rounded-sm mr-1 font-semibold">OpenAI</span> to your
                    agents to use.
                  </span>
                </div>
              }
            />
          ),
        },
      ],
    },
    {
      id: 'n2',
      name: 'Agents',
      initiallyExpanded: true,
      draggable: false,
      children: [
        {
          id: 'n1',
          name: 'GroupChat',
          onDrag: (event) => onDragStart(event, X_FORCE_NODES.GROUP_CHAT),
          jsxElement: (
            <NodeSkeleton
              name="GroupChat"
              content={
                <div className="text-sm">
                  <span className="bg-gray-100 px-1 text-gray-700 rounded-sm mr-1 font-semibold">GroupChat</span>
                  <span>is a subclass of ConversableAgent configured with a default system message.</span>
                </div>
              }
            />
          ),
        },
        {
          id: 'n2',
          name: 'UserProxy',
          onDrag: (event) => onDragStart(event, X_FORCE_NODES.USER_PROXY),
          jsxElement: (
            <NodeSkeleton
              name="UserProxy"
              content={
                <div className="text-sm">
                  <span className="bg-gray-100 px-1 text-gray-700 rounded-sm mr-1 font-semibold">UserProxy</span>
                  <span>
                    acts as a mediator between the agent workforce and the user, facilitating feedback communication.
                  </span>
                </div>
              }
            />
          ),
        },
        {
          id: 'n3',
          name: 'GPTAssistantAgent',
          onDrag: (event) => onDragStart(event, X_FORCE_NODES.GPT_ASSISTANT_AGENT),
          jsxElement: (
            <NodeSkeleton
              name="GPTAssistantAgent"
              content={
                <div className="text-sm">
                  <span className="bg-gray-100 px-1 text-gray-700 rounded-sm mr-1 font-semibold">
                    GPTAssistantAgent
                  </span>
                  <span>
                    built on OpenAI’s assistant API, enables the integration of any OpenAI Assistant into your
                    workforce.
                  </span>
                </div>
              }
            />
          ),
        },
      ],
    },
    {
      id: 'n3',
      name: 'Tools',
      initiallyExpanded: true,
      children: [
        {
          id: 'n1',
          name: 'CustomFunction',
          onDrag: (event) => onDragStart(event, X_FORCE_NODES.CUSTOM_FUNCTION),
          jsxElement: (
            <NodeSkeleton
              name="CustomFunction"
              content={
                <div className="text-sm">
                  <span className="bg-gray-100 px-1 text-gray-700 rounded-sm mr-1 font-semibold">CustomFunction</span>
                  <span>
                    allows you to add your own functions to GPTAssistantAgent to enhance them with specific
                    functionalities.
                  </span>
                </div>
              }
            />
          ),
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 border-r border-r-gray-20 w-80">
      <div className="border-b border-b-gray-200 h-11">
        <div className="pl-4 pt-2">
          <Image priority src={'/x-force.svg'} width={56} height={25} alt="software 2.0" />
        </div>
      </div>
      <div className="p-4">
        <p className="uppercase font-bold">Library</p>
        <Tree data={treeData} />
      </div>
      {process.env.NEXT_PUBLIC_VERSION_NUMBER && (
        <span
          className={`absolute bottom-0 bg-gray-200 w-80 border-t border-t-gray-300 text-sm px-4 py-1 cursor-pointer`}
        >
          {process.env.NEXT_PUBLIC_VERSION_NUMBER}
        </span>
      )}
    </div>
  );
};

export default LibraryPanel;
