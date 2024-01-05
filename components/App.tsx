import React from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';

import { CUSTOM_X_FORCE_NODES } from './nodes/nodeTypes';
import LibraryPanel from './UI/LibraryPanel/Panel';
import TopBar from './UI/TopBar';
import useXForceReactFlow from '@/hooks/useXForceReactFlow';

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
    onNodeContextMenu,
    onEdgeContextMenu,
    onMove,
    onSaveGraph,
    restoreGraph,
  } = useXForceReactFlow();

  React.useEffect(() => {
    restoreGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full">
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
          onMove={onMove}
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
