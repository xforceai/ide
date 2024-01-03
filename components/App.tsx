import React from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  ReactFlowInstance,
  NodeMouseHandler,
  Node,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LibraryPanel from '@/components/libraryPanel';
import { CODE_BUILDER, CUSTOM_X_FORCE_NODES, XForceNodesEnum, X_FORCE_NODES, extractNodeName } from './nodes/nodeTypes';
import { includes } from 'lodash';
import ContextMenu, { CtxMenuType } from './ContextMenu';

const AppX = () => {
  const reactFlowWrapper = React.useRef(null);
  const reactFlowRef = React.useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [menu, setMenu] = React.useState<CtxMenuType | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance>();

  const onConnect = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    [setEdges],
  );
  const onDragOver: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    [],
  );
  const onDrop: React.DragEventHandler<HTMLDivElement> = React.useCallback(
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
  const onNodeClick: NodeMouseHandler = (event: React.MouseEvent, node: Node) => {
    // send node id to configure panel.
  };

  const isValidConnection = (connection: Connection): boolean => {
    const sourceKey = extractNodeName(connection.source || '');
    const targetKey = extractNodeName(connection.target || '');
    const targetObj =
      targetKey && targetKey in XForceNodesEnum ? X_FORCE_NODES[targetKey as keyof typeof XForceNodesEnum] : null;
    if (!targetObj) return false;
    return includes(targetObj.data.connectivity.input, sourceKey);
  };

  const getNodes = () => {
    console.log(CODE_BUILDER(nodes, edges));
  };

  const onNodeCtxMenu = React.useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      const pane = reactFlowRef?.current?.getBoundingClientRect?.();
      console.log(pane);
      if (pane) {
        setMenu({
          id: node.id,
          top: event.clientY < pane.height - 200 ? event.clientY : undefined,
          left: event.clientX < pane.width - 200 ? event.clientX : undefined,
          right: event.clientX >= pane.width - 200 ? pane.width - event.clientX : undefined,
          bottom: event.clientY >= pane.height - 200 ? pane.height - event.clientY : undefined,
        });
      }
    },
    [setMenu],
  );
  const onPaneClick = React.useCallback(() => setMenu(null), [setMenu]);

  return (
    <div className="flex h-full">
      <LibraryPanel />
      <div onClick={getNodes}>Extract Code</div>
      <div className="flex-grow" ref={reactFlowWrapper}>
        <ReactFlow
          ref={reactFlowRef}
          nodes={nodes}
          edges={edges}
          nodeTypes={CUSTOM_X_FORCE_NODES}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeCtxMenu}
          isValidConnection={isValidConnection}
        >
          <Controls />
          <Background />
          {menu && <ContextMenu onClick={onPaneClick} menu={menu} />}
        </ReactFlow>
      </div>
    </div>
  );
};

export default AppX;
