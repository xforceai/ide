import React from 'react';
import ReactFlow, { Controls, Background, Node as ReactFlowNode } from 'reactflow';

import { CUSTOM_X_FORCE_NODES } from './nodes/nodeTypes';
import LibraryPanel from './UI/LibraryPanel/Panel';
import TopBar from './UI/TopBar';
import useXForceReactFlow from '@/hooks/useXForceReactFlow';
import { useContextMenu } from '@/hooks/useContextMenu';
import { ContextMenuContext } from '@/contexts/ContextMenuContext';

const AppX = () => {
  const { setClicked, setPoints } = React.useContext(ContextMenuContext);
  const {
    reactFlowRef,
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    onDropNode,
    onDragOver,
    isValidConnection,
    setReactFlowInstance,
  } = useXForceReactFlow();
  const {} = useContextMenu();

  const onNodeCtxMenu = React.useCallback(
    (event: React.MouseEvent, node: ReactFlowNode) => {
      setPoints({ x: event.pageX, y: event.pageY });
      setClicked(true);
    },
    [setClicked, setPoints],
  );

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
          onInit={setReactFlowInstance}
          onDrop={onDropNode}
          onDragOver={onDragOver}
          isValidConnection={isValidConnection}
          onNodeContextMenu={onNodeCtxMenu}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default AppX;
