import React, { memo } from 'react';
import { Position, Handle, NodeProps as ReactFlowNodeProps } from 'reactflow';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { XForceNodesEnum } from '../nodeTypes';
import useNodeHelper from '../helpers/node';

const GPTAssistantAgent: React.FC<ReactFlowNodeProps> = (props) => {
  const { addData } = useNodeHelper(props);

  const [agentName, setAgentName] = React.useState('');
  const [maxRounds, setMaxRounds] = React.useState<number>();
  const [agentSelection, setAgentSelection] = React.useState('auto');

  const onAgentNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      setAgentName(val);
      addData({ varName: agentName });
    },
    [addData, agentName],
  );
  const onMaxRoundsChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      setMaxRounds(parseInt(val));
      addData({ maxRounds: maxRounds });
    },
    [addData, maxRounds],
  );
  const onSpeakerSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setAgentSelection(val);
    addData({ agentSelection: val });
  };

  React.useEffect(() => {
    addData({ agentSelection: 'auto', varNam: 'gc', maxRounds: 15 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="rounded-sm border border-gray-200 bg-white min-w-80">
      <div className={`${XForceNodesEnum.GROUP_CHAT} flex justify-between items-center border-b border-gray-200 py-2`}>
        <div className="font-bold ml-2">GroupChat</div>
        <InformationCircleIcon width={24} className="text-gray-300 mr-2" />
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>Agent Name *</div>
          <input
            type="text"
            placeholder="my_gc"
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
            onChange={onAgentNameChange}
          />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>Max Rounds</div>
          <input
            type="number"
            value={maxRounds?.toString()}
            placeholder="15"
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
            onChange={onMaxRoundsChange}
          />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>Agent Selection</div>
          <select
            className="bg-gray-100 border border-gray-300 text-sm rounded-sm"
            onChange={onSpeakerSelectionChange}
            value={agentSelection}
          >
            <option value={'auto'}>auto</option>
            <option value={'manual'}>manual</option>
            <option value={'random'}>random</option>
            <option value={'round robin'}>round robin</option>
          </select>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="rounded-none border-none w-16 h-1 bg-gray-400" />
    </div>
  );
};

export default memo(GPTAssistantAgent);
