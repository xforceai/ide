import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Editor from 'react-simple-code-editor';
import { Handle, Position, useReactFlow, NodeProps as ReactFlowNodeProps, NodeToolbar } from 'reactflow';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { XForceNodesEnum } from '../nodeTypes';
import useNodeHelper from '../helpers/node';
import { DefaultContent, MethodHeaderSkeleton, ToolbarSkeleton } from '@/components/nodes/skeleton';

const CustomFunction: React.FC<ReactFlowNodeProps> = (props) => {
  const { addData } = useNodeHelper(props);
  const [code, setCode] = React.useState(
    props.data.func || `def my_custom_function(arg1, arg2): \n\treturn arg1 + arg2`,
  );
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const onCustomFuncChange = (code: string) => {
    setCode(code);
    addData({ func: code });
  };

  React.useEffect(() => {
    addData({ func: code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Editor
            value={code}
            onValueChange={onCustomFuncChange}
            highlight={(code) => highlight(code, languages.python)}
            className="max-w-96 max-h-96 overflow-y-auto"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
            textareaClassName="outline-none w-80"
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16 h-1" />
    </div>
  );
};

export default CustomFunction;
