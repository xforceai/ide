import React from 'react';

import { NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';

type ReturnType<T> = {
  data?: T;
  addData: (v: Partial<T>) => void;
};
// zustand might work better here instead of managing the store like this: https://reactflow.dev/learn/advanced-use/state-management
// but currently this implementation satisfy our needs.
function useNodeStore<T>(props: ReactFlowNodeProps): ReturnType<T> {
  const { setNodes, getNode } = useReactFlow();

  const addData = React.useCallback(
    (v: Partial<T>) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...v,
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
    data: getNode(props.id)?.data,
    addData,
  };
}

export default useNodeStore;
