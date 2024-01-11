import AppX from '@/components/UI/App';
import ModalContextProvider from '@/contexts/ModalContext';
import ValidatorContextProvider from '@/contexts/ValidatorContext';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';

const IDE = () => {
  const disableDefaultContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <div onContextMenu={disableDefaultContextMenu}>
      <ValidatorContextProvider>
        <ModalContextProvider>
          <ReactFlowProvider>
            <AppX />
          </ReactFlowProvider>
        </ModalContextProvider>
      </ValidatorContextProvider>
    </div>
  );
};

export default IDE;
