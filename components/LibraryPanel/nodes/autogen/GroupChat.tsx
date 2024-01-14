import { XForceNodesEnum } from '@/components/LibraryPanel/nodes/nodeTypes';
import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/LibraryPanel/nodes/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { memo } from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';

const GroupChat: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { addNodeData } = useDnDStore();
  const { getNode } = useReactFlow();
  const [toolbarVisible, setToolbarVisible] = React.useState(false);
  const data = getNode(props.id)?.data;

  const onAgentNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addNodeData(props.id, { variableName: val });
    },
    [addNodeData, props.id],
  );
  const onMaxRoundsChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addNodeData(props.id, { maxRounds: parseInt(val) });
    },
    [addNodeData, props.id],
  );
  const onSpeakerSelectionChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      addNodeData(props.id, { agentSelection: val });
    },
    [addNodeData, props.id],
  );

  return (
    <div className="rounded-sm border border-gray-200 bg-white w-80">
      <div className={`${XForceNodesEnum.GROUP_CHAT} flex justify-between items-center border-b border-gray-200 py-2`}>
        <div className="font-bold ml-2">GroupChat</div>
        <InformationCircleIcon
          width={24}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="GroupChat" />}
            content={
              <DefaultContent
                name="GroupChat"
                description="is designed to enable agents to collaborate with each other. All agents should be included in a GroupChat to facilitate their communication and teamwork."
                docTeaser={`Group Name: Name of the group. (ex: group_chat, my_x_force_group, etc.)\n\nMax Rounds: The maximum rounds that the agents will iterate (default: 15).\n\nAgent Selection: the method for selecting the next speaker (default: "auto").\n• "auto": the next speaker is selected automatically by LLM.\n• "manual": the next speaker is selected manually by user input.\n• "random": the next speaker is selected randomly.\n• "round_robin": the next speaker is selected in a round robin fashion, i.e., iterating in the same order as provided in agents.`}
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>Group Name *</div>
          <input
            type="text"
            placeholder="my_gc"
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
            defaultValue=""
            value={data?.variableName || ''}
            onChange={onAgentNameChange}
          />
        </div>
        {errors?.[props.id]?.variableName && (
          <span className="text-red-500 text-xs">{errors?.[props.id]?.variableName}</span>
        )}
        <div className="flex justify-between items-center pt-2">
          <div>Max Rounds</div>
          <input
            type="number"
            placeholder="15"
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
            defaultValue=""
            value={data?.maxRounds || ''}
            onChange={onMaxRoundsChange}
          />
        </div>
        {errors?.[props.id]?.maxRounds && <span className="text-red-500 text-xs">{errors?.[props.id]?.maxRounds}</span>}
        <div className="flex justify-between items-center pt-2">
          <div>Agent Selection</div>
          <select
            className="bg-gray-100 border border-gray-300 text-sm rounded-sm"
            value={data?.agentSelection || ''}
            onChange={onSpeakerSelectionChange}
          >
            <option value={'auto'}>auto</option>
            <option value={'manual'}>manual</option>
            <option value={'random'}>random</option>
            <option value={'round robin'}>round robin</option>
          </select>
        </div>
        {errors?.[props.id]?.agentSelection && (
          <span className="text-red-500 text-xs">{errors?.[props.id]?.agentSelection}</span>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="rounded-none border-none w-16 h-1" />
    </div>
  );
};

export default memo(GroupChat);
