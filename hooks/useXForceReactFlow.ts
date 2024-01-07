import React from 'react';
import {
  Connection,
  MarkerType,
  ReactFlowInstance,
  ReactFlowProps,
  addEdge,
  useEdgesState,
  useNodesState,
  Node as ReactFlowNode,
  Edge as ReactFlowEdge,
  useReactFlow,
  ReactFlowJsonObject,
} from 'reactflow';
import { includes } from 'lodash';
import { XForceNodesEnum, X_FORCE_NODES, extractNodeName } from '@/components/nodes/nodeTypes';
import { ModalContext } from '@/contexts/ModalContext/Context';
import { LOCAL_HISTORY_KEY } from '@/commons/constants';

type ReturnType = ReactFlowProps & {
  reactFlowRef: React.MutableRefObject<HTMLDivElement | null>;
  onSaveGraph: () => boolean;
  onNewGraph: () => boolean;
  restoreGraph: () => void;
  maskedFlow: ReactFlowJsonObject<any, any> | null;
  setNodes: React.Dispatch<React.SetStateAction<ReactFlowNode<any, string | undefined>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<ReactFlowEdge<any>[]>>;
};

function useXForceReactFlow(): ReturnType {
  const { setModal } = React.useContext(ModalContext);
  const reactFlowRef = React.useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance>();
  const { setViewport } = useReactFlow();

  const isValidConnection = (connection: Connection): boolean => {
    const sourceKey = extractNodeName(connection.source || '');
    const targetKey = extractNodeName(connection.target || '');
    const targetObj =
      targetKey && targetKey in XForceNodesEnum ? X_FORCE_NODES[targetKey as keyof typeof XForceNodesEnum] : null;
    if (!targetObj) return false;
    return includes(targetObj.data.connectivity.input, sourceKey);
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      event.preventDefault();
      const node = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      if (typeof node === 'undefined' || !node) {
        return;
      }
      const position = reactFlowInstance?.screenToFlowPosition({
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

  const onInit = (rf: ReactFlowInstance) => setReactFlowInstance(rf);

  const onMove = () => {
    setModal(null);
  };

  const maskedFlow = (): ReactFlowJsonObject<any, any> | null => {
    if (reactFlowInstance) {
      let flow = reactFlowInstance.toObject();
      const maskedNodes = flow.nodes.map((n) => {
        if (n.type === XForceNodesEnum.LLM_OPENAI) {
          return { ...n, data: { ...n.data, apiKey: '' } };
        }
        return n;
      });
      flow.nodes = maskedNodes;
      return flow;
    }
    return null;
  };

  const onSaveGraph = () => {
    if (reactFlowInstance) {
      localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(maskedFlow()));
      return true;
    }
    return false;
  };

  const restoreGraph = () => {
    const history = localStorage.getItem(LOCAL_HISTORY_KEY);
    if (history) {
      const flow = JSON.parse(history);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    }
  };

  const onNewGraph = (): boolean => {
    const res = onSaveGraph();
    setEdges([]);
    setNodes([]);
    return res;
  };

  return {
    reactFlowRef,
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onDrop,
    isValidConnection,
    onDragOver,
    onConnect,
    onInit,
    onMove,
    onSaveGraph,
    onNewGraph,
    restoreGraph,
    setNodes,
    maskedFlow: maskedFlow(),
    setEdges,
  };
}

export default useXForceReactFlow;
