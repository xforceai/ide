import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/LibraryPanel/nodes/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
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

  const onAgentNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addNodeData(props.id, { variableName: val });
    },
    [addNodeData, props.id],
  );

  const onSystemPromptChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      addNodeData(props.id, { systemPrompt: val });
    },
    [addNodeData, props.id],
  );

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
                docTeaser={`Agent Name: Name of the agent. (ex: my_gpt_assistant_agent_1)\n\nSystem Message: A message for the ChatCompletion inference.`}
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>Agent Name *</div>
          <input
            type="text"
            placeholder="my_agent"
            defaultValue=""
            onChange={onAgentNameChange}
            value={data?.variableName || ''}
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
          />
        </div>
        {errors?.[props.id]?.variableName && (
          <span className="text-red-500 text-xs">{errors?.[props.id]?.variableName}</span>
        )}
        <div className="flex justify-between items-center pt-2">
          <div>System Message</div>
          <input
            type="text"
            placeholder="Solve tasks using your coding and language skills. In the following cases, suggest python code (in a python coding block) or shell script (in a sh coding block) for the user to execute."
            defaultValue=""
            onChange={onSystemPromptChange}
            value={data?.systemPrompt || ''}
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
          />
        </div>
        {errors?.[props.id]?.variableName && (
          <span className="text-red-500 text-xs">{errors?.[props.id]?.systemPrompt}</span>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="rounded-none border-none w-16" />
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default AssistantAgent;
