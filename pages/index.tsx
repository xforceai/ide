import AppX from '@/components/App';
import ModalContextProvider from '@/contexts/ModalContext/Provider';
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
