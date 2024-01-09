import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';

import { DND_ID } from '@/commons/constants';
import TopBar from '@/components/UI/TopBar';
import LibraryPanel from '@/components/UI/libraryPanel';
import { CUSTOM_X_FORCE_NODES } from '@/components/UI/libraryPanel/nodes/nodeTypes';
import ToastMessageModal from '@/components/modals/ToastMessageModal';
import { ModalContext } from '@/contexts/ModalContext';
import useDnDFlow from '@/hooks/useDnDFlow';
import useKeyboardListener from '@/hooks/useKeyboardListener';
import useDnDStore from '@/stores/useDnDStore';

const AppX = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit } = useDnDStore();
  const {
    onNodeDragOver,
    onNodeDropToWorkstation,
    isValidConnection,
    onNodeContextMenu,
    onEdgeContextMenu,
    onSaveGraph,
  } = useDnDFlow();
  const { setModal } = React.useContext(ModalContext);

  useKeyboardListener({
    onSave: { f: onSaveGraph, msg: <ToastMessageModal msg="Your changes automatically saved." /> },
  });

  return (
    <div className="flex h-screen">
      <LibraryPanel />
      <div className="flex-grow">
        <TopBar />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={CUSTOM_X_FORCE_NODES}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDrop={onNodeDropToWorkstation}
          onDragOver={onNodeDragOver}
          isValidConnection={isValidConnection}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          onMoveStart={() => setModal(null)}
          className={DND_ID}
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
