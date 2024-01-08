import { XForceNodesEnum } from '@/components/UI/libraryPanel/nodes/nodeTypes';
import { DefaultContent, MethodHeaderSkeleton, ToolbarSkeleton } from '@/components/UI/libraryPanel/nodes/skeleton';
import useNodeStore from '@/hooks/useNodeStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import AceEditor from 'react-ace';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps } from 'reactflow';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-java';

type CustomFunctionNodeDataType = {
  func: string;
};

const CustomFunction: React.FC<ReactFlowNodeProps> = (props) => {
  const { data, addData } = useNodeStore<CustomFunctionNodeDataType>(props);
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const onCustomFuncChange = (code: string) => {
    addData({ func: code });
  };

  return (
    <div className="nowheel rounded-sm border border-gray-200 bg-white min-w-80">
      <div
        className={`${XForceNodesEnum.CUSTOM_FUNCTION} flex justify-between items-center border-b border-gray-200 py-2`}
      >
        <div className="font-bold ml-2">Custom Function</div>
        <InformationCircleIcon
          width={24}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<MethodHeaderSkeleton name="my_custom_function" />}
            content={
              <DefaultContent
                name="CustomFunction"
                description="is a method for your agents to consume when it's necessary."
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center pt-2">
          <AceEditor
            theme="twilight"
            mode={'python'}
            showPrintMargin={false}
            editorProps={{ $blockScrolling: true }}
            onChange={onCustomFuncChange}
            value={data?.func}
            tabSize={2}
            height="250px"
            width="350px"
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16 h-1" />
    </div>
  );
};

export default CustomFunction;
