import React from 'react';
import {
  Connection,
  Edge,
  MarkerType,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { includes } from 'lodash';
import { XForceNodesEnum, X_FORCE_NODES, extractNodeName } from '@/components/nodes/nodeTypes';

type ReturnType = {
  reactFlowRef: React.MutableRefObject<HTMLDivElement | null>;
  nodes: Node<any, string | undefined>[];
  onNodesChange: OnNodesChange;
  edges: Edge<any>[];
  onEdgesChange: OnEdgesChange;
  onDropNode: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onConnect: OnConnect;
  isValidConnection: (connection: Connection) => boolean;
  setReactFlowInstance: React.Dispatch<React.SetStateAction<ReactFlowInstance | undefined>>;
};
function useXForceReactFlow(): ReturnType {
  const reactFlowRef = React.useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance>();

  const isValidConnection = (connection: Connection): boolean => {
    const sourceKey = extractNodeName(connection.source || '');
    const targetKey = extractNodeName(connection.target || '');
    const targetObj =
      targetKey && targetKey in XForceNodesEnum ? X_FORCE_NODES[targetKey as keyof typeof XForceNodesEnum] : null;
    if (!targetObj) return false;
    return includes(targetObj.data.connectivity.input, sourceKey);
  };

  const onDropNode: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      event.preventDefault();
      const node = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      if (typeof node === 'undefined' || !node) {
        return;
      }
      // @ts-ignore
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      node['position'] = position;
      setNodes((nds) => nds.concat(node));
    },
    [reactFlowInstance, setNodes],
  );

  const onDragOver: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    [],
  );

  const onConnect = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    [setEdges],
  );

  return {
    reactFlowRef,
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onDropNode,
    isValidConnection,
    onDragOver,
    onConnect,
    setReactFlowInstance,
  };
}

export default useXForceReactFlow;
