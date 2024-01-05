import AppX from '@/components/App';
import ContextMenuProvider from '@/contexts/ContextMenuContext';
import { useRouter } from 'next/router';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';

const IDE = () => {
  const router = useRouter();
  const unsavedChanges = true;

  const handleWindowClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = true;
  };
  const handleBrowseAway = React.useCallback(() => {
    if (!unsavedChanges) return;
    if (window.confirm()) return;
    router.events.emit('routeChangeError');
    throw 'routeChange aborted.';
  }, [router.events, unsavedChanges]);

  React.useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [handleBrowseAway, router.events, unsavedChanges]);

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
