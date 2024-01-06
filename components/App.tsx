import React from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';

import { CUSTOM_X_FORCE_NODES } from './nodes/nodeTypes';
import LibraryPanel from './UI/LibraryPanel/Panel';
import TopBar from './UI/TopBar';
import useXForceReactFlow from '@/hooks/useXForceReactFlow';
import useOnCloseIDE from '@/hooks/useOnCloseIDE';
import useKeyboardListener from '@/hooks/useKeyboardListener';
import { ModalContext } from '@/contexts/ModalContext/Context';
import ContextMenuModal, { DefaultContextMenuItem } from '@/components/modals/ContextMenuModal';
import { ContextMenuItemType } from '@/commons/types';
import { Node as ReactFlowNode, Edge as ReactFlowEdge } from 'reactflow';

const AppX = () => {
  const {
    reactFlowRef,
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    isValidConnection,
    onInit,
    onMove,
    onSaveGraph,
    restoreGraph,
    reactFlowInstance,
    setNodes,
    setEdges,
  } = useXForceReactFlow();
  useOnCloseIDE({ reactFlowInstance: reactFlowInstance });
  useKeyboardListener({ onSaveCmd: onSaveGraph });
  const { setModal, setPoints } = React.useContext(ModalContext);
  React.useEffect(() => {
    restoreGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeleteNode = React.useCallback(
    (node: ReactFlowNode) => {
      setNodes((nodes) => nodes.filter((n) => n.id !== node.id));
      setEdges((edges) => edges.filter((e) => e.source !== node.id));
    },
    [setNodes, setEdges],
  );

  const onDeleteEdge = React.useCallback(
    (edge: ReactFlowEdge) => {
      setEdges((edges) => edges.filter((e) => e.id !== edge.id));
    },
    [setEdges],
  );

  const onNodeContextMenu = React.useCallback(
    (event: React.MouseEvent, node: ReactFlowNode) => {
      const CTX_MENU__NODE: ContextMenuItemType[] = [{ item: 'Delete Node', onClick: () => onDeleteNode(node) }];
      setPoints({ x: event.pageX, y: event.pageY });
      setModal(<ContextMenuModal menu={CTX_MENU__NODE} />);
    },
    [onDeleteNode, setModal, setPoints],
  );

  const onEdgeContextMenu = React.useCallback(
    (event: React.MouseEvent, edge: ReactFlowEdge) => {
      setPoints({ x: event.pageX, y: event.pageY });
      const CTX_MENU__EDGE: ContextMenuItemType[] = [{ item: 'Delete Node', onClick: () => onDeleteEdge(edge) }];
      setModal(<ContextMenuModal menu={CTX_MENU__EDGE} />);
    },
    [onDeleteEdge, setModal, setPoints],
  );

  return (
    <div className="flex h-screen">
      <LibraryPanel />
      <div className="flex-grow">
        <TopBar onSaveGraph={onSaveGraph} />
        <ReactFlow
          ref={reactFlowRef}
          nodes={nodes}
          edges={edges}
          nodeTypes={CUSTOM_X_FORCE_NODES}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDrop={onDrop}
          onDragOver={onDragOver}
          isValidConnection={isValidConnection}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          onMoveStart={onMove}
          className="XForceIDE"
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default AppX;
