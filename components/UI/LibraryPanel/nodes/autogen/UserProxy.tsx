import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/UI/libraryPanel/nodes/skeleton';
import useDnDStore from '@/stores/useDnDStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';
import { XForceNodesEnum } from '../nodeTypes';

const UserProxy: React.FC<ReactFlowNodeProps> = (props) => {
  const { addNodeData } = useDnDStore();
  const { getNode } = useReactFlow();
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const data = getNode(props.id)?.data;
  const onVarNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addNodeData(props.id, { varName: val });
    },
    [addNodeData, props.id],
  );
  const onPromptChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      addNodeData(props.id, { prompt: val });
    },
    [addNodeData, props.id],
  );

  return (
    <div className="rounded-sm border border-gray-200 bg-white w-80">
      <div className={`${XForceNodesEnum.USER_PROXY} flex justify-between items-center border-b border-gray-200 py-2`}>
        <div className="font-bold ml-2">UserProxy</div>
        <InformationCircleIcon
          width={24}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="UserProxy" />}
            content={
              <DefaultContent
                name="UserProxy"
                description="is a proxy agent for the user, that can execute
                code and provide feedback to the other agents. By default, the agent will prompt for human input every
                time a message is received. Code execution is enabled by default. LLM-based auto reply is disabled by default."
                docTeaser="Agent Name: Name of the agent."
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>Agent Name</div>
          <input
            type="text"
            placeholder="user_proxy"
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
            value={data?.varName || ''}
            onChange={onVarNameChange}
          />
        </div>
      </div>
      <div className="p-2 bg-gray-50 pt-2">
        <div className="flex justify-between items-center">
          <div>Initial Prompt</div>
          <input
            type="text"
            placeholder="user_proxy"
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
            value={data?.prompt || ''}
            onChange={onPromptChange}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default UserProxy;
