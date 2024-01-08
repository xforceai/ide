import { XForceNodesEnum } from '@/components/UI/libraryPanel/nodes/nodeTypes';
import { DefaultContent, ToolbarSkeleton } from '@/components/UI/libraryPanel/nodes/skeleton';
import useNodeStore from '@/hooks/useNodeStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps } from 'reactflow';

enum OAIModelsEnum {
  GPT_3_5_TURBO = 'gpt-3.5-turbo-1106',
  GPT_3_5_TURBO_16K = 'gpt-3.5-turbo-16k',
  GPT_4 = 'gpt-4-0613',
  GPT_4_32K = 'gpt-4-32k-0613',
}
type OAIModelsType = (typeof OAIModelsEnum)[keyof typeof OAIModelsEnum];

type OpenAIDataType = {
  model: OAIModelsType;
  apiKey: string;
};

const OpenAI: React.FC<ReactFlowNodeProps> = (props) => {
  const { data, addData } = useNodeStore<OpenAIDataType>(props);
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const onModelNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
      const val = evt.target.value as OAIModelsEnum;
      addData({ model: val });
    },
    [addData],
  );
  const onApiKeyChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addData({ apiKey: val });
    },
    [addData],
  );
  return (
    <div className="rounded-sm border border-gray-200 bg-white min-w-80">
      <div className={`${XForceNodesEnum.LLM_OPENAI} flex justify-between items-center border-b border-gray-200 py-2`}>
        <div className="font-bold ml-2">OpenAI</div>
        <InformationCircleIcon
          width={24}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<p className="text-purple-400 pl-1">OpenAI: Union[Dict, Literal[False]]</p>}
            content={
              <DefaultContent
                description="A foundational model for your agents to consume."
                docTeaser={`Model: Preferred OpenAI model\n\nAPI Key: The API key of your OpenAI account (X-Force does not store your API key neither on the cloud or on your local).`}
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>Model *</div>
          <select
            className="bg-gray-100 border border-gray-300 text-sm rounded-sm"
            onChange={onModelNameChange}
            value={data?.model}
          >
            <option value={OAIModelsEnum.GPT_3_5_TURBO}>gpt-3.5-turbo-1106</option>
            <option value={OAIModelsEnum.GPT_3_5_TURBO_16K}>gpt-3.5-turbo-16k</option>
            <option value={OAIModelsEnum.GPT_4}>gpt-4-0613</option>
            <option value={OAIModelsEnum.GPT_4_32K}>gpt-4-32k-0613</option>
          </select>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>API Key *</div>
          <input
            type="text"
            placeholder="sk-***"
            onChange={onApiKeyChange}
            value={data?.apiKey}
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default OpenAI;