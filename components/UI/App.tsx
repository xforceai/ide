import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';

import { ContextMenuItemType } from '@/commons/types';
import ContextMenuModal from '@/components/modals/ContextMenuModal';
import ToastMessageModal from '@/components/modals/ToastMessageModal';
import { ModalContext } from '@/contexts/ModalContext';
import useKeyboardListener from '@/hooks/useKeyboardListener';
import useOnCloseIDE from '@/hooks/useOnCloseIDE';
import useXForceReactFlow from '@/hooks/useXForceReactFlow';
import { Edge as ReactFlowEdge, Node as ReactFlowNode } from 'reactflow';
import LibraryPanel from './libraryPanel';
import { CUSTOM_X_FORCE_NODES } from './libraryPanel/nodes/nodeTypes';
import TopBar from './topBar';

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
    setNodes,
    setEdges,
    onNewGraph,
    maskedFlow,
  } = useXForceReactFlow();
  useOnCloseIDE({ maskedFlow });
  useKeyboardListener({
    onSave: { f: onSaveGraph, msg: <ToastMessageModal msg="Your changes successfully saved." /> }, // probably this is anti-pattern or there are better ways to handle / probably using emitters
  });
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
      setPoints({ left: event.pageX, top: event.pageY });
      setModal(<ContextMenuModal menu={CTX_MENU__NODE} />);
    },
    [onDeleteNode, setModal, setPoints],
  );

  const onEdgeContextMenu = React.useCallback(
    (event: React.MouseEvent, edge: ReactFlowEdge) => {
      setPoints({ left: event.pageX, top: event.pageY });
      const CTX_MENU__EDGE: ContextMenuItemType[] = [{ item: 'Delete Edge', onClick: () => onDeleteEdge(edge) }];
      setModal(<ContextMenuModal menu={CTX_MENU__EDGE} />);
    },
    [onDeleteEdge, setModal, setPoints],
  );

  return (
    <div className="flex h-screen">
      <LibraryPanel />
      <div className="flex-grow">
        <TopBar onSaveGraph={onSaveGraph} onNewGraph={onNewGraph} onRestore={restoreGraph} />
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
