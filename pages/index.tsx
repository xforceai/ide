import App from '@/components/App';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';

const IDE = () => {
  return (
  <ReactFlowProvider>
    <div className='h-screen'>
      <App />
    </div>
    </ReactFlowProvider>
  );
}

export default IDE;
