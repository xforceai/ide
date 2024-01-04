import React from 'react';
import { XForceNodeType, X_FORCE_NODES } from './nodes/nodeTypes';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { Tree, TreeProps } from './FileTree';
import ItemSkeleton from './UI/LibraryPanel/NodeSkeleton';

const LibraryPanel = () => {
  const onDragStart = (event: React.DragEvent, node: XForceNodeType) => {
    const newNode = { ...node, id: `${node.id}__${uuidv4()}` };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(newNode));
    event.dataTransfer.effectAllowed = 'move';
  };

  const treeData: TreeProps<{}>['data'] = [
    {
      id: 'n1',
      name: 'Agents',
      children: [
        {
          id: 'n1',
          name: 'GroupChat',
          onDrag: (event) => onDragStart(event, X_FORCE_NODES.GROUP_CHAT),
          jsxElement: (
            <ItemSkeleton
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
            <ItemSkeleton
              name="UserProxy"
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
          id: 'n3',
          name: 'GPTAssistantAgent',
          onDrag: (event) => onDragStart(event, X_FORCE_NODES.GPT_ASSISTANT_AGENT),
          jsxElement: (
            <ItemSkeleton
              name="GPTAssistantAgent"
              content={
                <div className="text-sm">
                  <span className="bg-gray-100 px-1 text-gray-700 rounded-sm mr-1 font-semibold">GroupChat</span>
                  <span>is a subclass of ConversableAgent configured with a default system message.</span>
                </div>
              }
            />
          ),
        },
      ],
    },
    {
      id: 'n2',
      name: 'Tools',
      children: [
        {
          id: 'n1',
          name: 'CustomFunction',
          onDrag: (event) => onDragStart(event, X_FORCE_NODES.CUSTOM_FUNCTION),
          jsxElement: (
            <ItemSkeleton
              name="CustomFunction"
              content={
                <div className="text-sm">
                  <span className="bg-gray-100 px-1 text-gray-700 rounded-sm mr-1 font-semibold">GroupChat</span>
                  <span>is a subclass of ConversableAgent configured with a default system message.</span>
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
        <p className="uppercase text-xs font-bold">Library</p>
        <Tree data={treeData} />
      </div>
    </div>
  );
};

export default LibraryPanel;
