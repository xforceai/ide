import AppX from '@/components/UI/App';
import MobilePanel from '@/components/UI/Mobile';
import ModalContextProvider from '@/contexts/ModalContext';
import ValidatorContextProvider from '@/contexts/ValidatorContext';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';

const IDE = () => {
  const disableDefaultContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="block xl:hidden lg:hidden md:hidden whitespace-pre-line">
        <MobilePanel />
      </div>
      <div onContextMenu={disableDefaultContextMenu} className="hidden xl:block lg:block md:block">
        <ValidatorContextProvider>
          <ModalContextProvider>
            <ReactFlowProvider>
              <AppX />
            </ReactFlowProvider>
          </ModalContextProvider>
        </ValidatorContextProvider>
      </div>
    </>
  );
};

export default IDE;
