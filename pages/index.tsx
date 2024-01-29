import AppX from '@/components/UI/App';
import MobilePanel from '@/components/UI/Mobile';
import ModalContextProvider from '@/contexts/ModalContext';
import ValidatorContextProvider from '@/contexts/ValidatorContext';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';

const IDE = () => {
  const disableDefaultContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="hidden sm:block">
        <div onContextMenu={disableDefaultContextMenu} className="hidden xl:block lg:block md:block">
          <ValidatorContextProvider>
            <ModalContextProvider>
              <ReactFlowProvider>
                <AppX />
                <Analytics />
              </ReactFlowProvider>
            </ModalContextProvider>
          </ValidatorContextProvider>
        </div>
      </div>
      <div className="block md:hidden">
        <MobilePanel />
      </div>
    </>
  );
};

export default IDE;
