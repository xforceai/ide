import React from 'react';
import ReactFlow, { Controls, Background, Node as ReactFlowNode } from 'reactflow';

import { CUSTOM_X_FORCE_NODES } from './nodes/nodeTypes';
import LibraryPanel from './UI/LibraryPanel/Panel';
import TopBar from './UI/TopBar';
import useXForceReactFlow from '@/hooks/useXForceReactFlow';
import { ContextMenuContext } from '@/contexts/ContextMenuContext';

const AppX = () => {
  const { setCtxMenuModal, setPoints } = React.useContext(ContextMenuContext);
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
    onNodeContextMenu,
    onEdgeContextMenu,
    onMove,
  } = useXForceReactFlow();
  return (
    <div className="flex h-full">
      <LibraryPanel />
      <div className="flex-grow">
        <TopBar />
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
          onMove={onMove}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default AppX;
