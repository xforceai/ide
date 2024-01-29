import FieldSchema, { InputField, SelectField } from '@/components/LibraryPanel/nodes/Fields';
import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/LibraryPanel/nodes/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { OAIModelsEnum } from '@/types/enum';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';
import { XForceNodesEnum } from '../nodeTypes';

const GPTAssistantAgent: React.FC<ReactFlowNodeProps> = (props) => {
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
  const onOAIIdChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addNodeData(props.id, { OAIId: val });
    },
    [addNodeData, props.id],
  );

  return (
    <div className="rounded-sm border border-gray-200 bg-white w-80">
      <div
        className={`${XForceNodesEnum.GPT_ASSISTANT_AGENT} flex justify-between items-center border-b border-gray-200 py-2`}
      >
        <div className="font-bold ml-2">GPTAssistantAgent</div>
        <InformationCircleIcon
          width={24}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="GPTAssistantAgent" />}
            content={
              <DefaultContent
                name="GPTAssistantAgent"
                description="is an agent that leverages the OpenAI Assistant API for conversational capabilities."
                docTeaser={`Agent Name: Name of the agent. (ex: my_gpt_assistant_agent_1)\n\nOpenAI ID: The id of the agent that you obtained from https://platform.openai.com/assistants. LLM: Any large language model provided by OpenAI for the agent to consume.`}
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="pb-2 px-2 bg-gray-50">
        <FieldSchema
          field={
            <InputField
              label="Agent Name"
              required
              onChange={onAgentNameChange}
              value={data?.variableName}
              type="text"
              placeholder="my_agent"
            />
          }
          errors={errors?.[props.id]?.variableName}
        />
        <FieldSchema
          field={
            <InputField
              label="OpenAI ID"
              required
              onChange={onOAIIdChange}
              value={data?.OAIId}
              type="text"
              placeholder="asst-****"
            />
          }
          errors={errors?.[props.id]?.OAIId}
        />
        <FieldSchema
          field={
            <SelectField
              label="LLM"
              selected={data?.selectedModel || OAIModelsEnum.GPT_3_5_TURBO}
              onChange={(e) => addNodeData(props.id, { selectedModel: e.target.value })}
              options={Object.values(OAIModelsEnum)}
            />
          }
          errors={errors?.[props.id]?.selectedModel}
        />
      </div>

      <Handle type="target" position={Position.Top} className="rounded-none border-none w-16" />
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default GPTAssistantAgent;
