import AppX from '@/components/UI/App';
import ModalContextProvider from '@/contexts/ModalContext';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';

const IDE = () => {
  const disableDefaultContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <div onContextMenu={disableDefaultContextMenu}>
      <ModalContextProvider>
        <ReactFlowProvider>
          <AppX />
        </ReactFlowProvider>
      </ModalContextProvider>
    </div>
  );
};

export default IDE;
