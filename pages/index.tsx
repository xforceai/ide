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
    <>
      <div className="block xl:hidden lg:hidden md:hidden whitespace-pre-line">
        X-Force IDE is a low code agent as a service UI framework that lets you to create agent based workforces from
        drag and drop like user interface.{'\n\n'} In order to use drag and drop features and code execution ability,
        you need to access the IDE using your computer.
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
