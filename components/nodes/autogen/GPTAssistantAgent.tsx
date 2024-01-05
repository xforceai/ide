import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, Position, NodeProps as ReactFlowNodeProps } from 'reactflow';
import { XForceNodesEnum } from '../nodeTypes';
import useNodeHelper from '../helpers/node';

const GPTAssistantAgent: React.FC<ReactFlowNodeProps> = (props) => {
  const { addData } = useNodeHelper(props);
  const [agentName, setAgentName] = React.useState('');
  const [OAIId, setOAIId] = React.useState('');

  const onAgentNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      setAgentName(val);
      addData({ varName: agentName });
    },
    [addData, agentName],
  );
  const onOAIIdChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      setOAIId(val);
      addData({ OAIId: OAIId });
    },
    [OAIId, addData],
  );

  React.useEffect(() => {
    // set default values
    addData({ varName: 'gpt_assistant_agent', OAIId: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="rounded-sm border border-gray-200 bg-white min-w-80">
      <div
        className={`${XForceNodesEnum.GPT_ASSISTANT_AGENT} flex justify-between items-center border-b border-gray-200 py-2`}
      >
        <div className="font-bold ml-2">GPTAssistantAgent</div>
        <InformationCircleIcon width={24} className="text-gray-300 mr-2" />
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>Agent Name *</div>
          <input
            type="text"
            placeholder="my_agent"
            onChange={onAgentNameChange}
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
          />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>OpenAI ID *</div>
          <input
            type="text"
            placeholder="asst_"
            onChange={onOAIIdChange}
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="rounded-none border-none w-16" />
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default GPTAssistantAgent;
