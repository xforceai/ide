import React from 'react';

import { NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';

type ReturnType = {
  addData: (a: { [k: string]: any }) => void;
};
function useNodeHelper(props: ReactFlowNodeProps): ReturnType {
  const { setNodes } = useReactFlow();

  const addData = React.useCallback(
    (a: { [k: string]: any }) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...a,
              },
            };
          }
          return node;
        }),
      );
    },
    [props.id, setNodes],
  );

  return {
    addData,
  };
}

export default useNodeHelper;
