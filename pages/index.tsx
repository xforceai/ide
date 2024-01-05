import AppX from '@/components/App';
import ContextMenuProvider from '@/contexts/ContextMenuContext';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';

const IDE = () => {
  return (
    <ContextMenuProvider>
      <ReactFlowProvider>
        <div className="h-screen">
          <AppX />
        </div>
      </ReactFlowProvider>
    </ContextMenuProvider>
  );
};

export default IDE;
