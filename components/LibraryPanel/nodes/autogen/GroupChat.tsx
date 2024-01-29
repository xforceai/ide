import FieldSchema, { InputField, SelectField } from '@/components/LibraryPanel/nodes/Fields';
import { XForceNodesEnum } from '@/components/LibraryPanel/nodes/nodeTypes';
import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/LibraryPanel/nodes/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { AgentSelectionStrategyEnum, OAIModelsEnum } from '@/types/enum';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { memo } from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';

const GroupChat: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { addNodeData } = useDnDStore();
  const { getNode } = useReactFlow();
  const [toolbarVisible, setToolbarVisible] = React.useState(false);
  const data = getNode(props.id)?.data;

  const onAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    addNodeData(props.id, { variableName: val });
  };
  const onMaxRoundsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    addNodeData(props.id, { maxRounds: parseInt(val) });
  };
  const onSpeakerSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    addNodeData(props.id, { agentSelection: val });
  };
  const onLLMChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    addNodeData(props.id, { selectedModel: val });
  };

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
                docTeaser={`Group Name: Name of the group. (ex: group_chat, my_x_force_group, etc.)\n\nMax Rounds: The maximum rounds that the agents will iterate (default: 15).\n\nAgent Selection: the method for selecting the next speaker (default: "auto").\n• "auto": the next speaker is selected automatically by LLM.\n• "manual": the next speaker is selected manually by user input.\n• "random": the next speaker is selected randomly.\n• "round_robin": the next speaker is selected in a round robin fashion, i.e., iterating in the same order as provided in agents. LLM: Any large language model provided by OpenAI for the GroupChatManager to consume.`}
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="pb-2 px-2 bg-gray-50">
        <FieldSchema
          field={
            <InputField
              label="Group Name"
              type="text"
              required
              onChange={onAgentNameChange}
              value={data?.variableName}
              placeholder="my_gc"
            />
          }
          errors={errors?.[props.id]?.variableName}
        />
        <FieldSchema
          field={
            <InputField
              label="Max Rounds"
              type="number"
              onChange={onMaxRoundsChange}
              value={data?.maxRounds}
              placeholder="15"
            />
          }
          errors={errors?.[props.id]?.maxRounds}
        />
        <FieldSchema
          field={
            <SelectField
              label="Agent Selection"
              onChange={onSpeakerSelectionChange}
              selected={data?.agentSelection}
              options={Object.values(AgentSelectionStrategyEnum)}
            />
          }
          errors={errors?.[props.id]?.agentSelection}
        />
        <FieldSchema
          field={
            <SelectField
              label="LLM"
              onChange={onLLMChange}
              selected={data?.selectedModel}
              options={Object.values(OAIModelsEnum)}
            />
          }
          errors={errors?.[props.id]?.selectedModel}
        />
      </div>
      <Handle type="target" position={Position.Top} className="rounded-none border-none w-16 h-1" />
    </div>
  );
};

export default memo(GroupChat);
