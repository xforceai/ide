import { LOCAL_HISTORY_KEY } from '@/commons/constants';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { ReactFlowJsonObject } from 'reactflow';

type ArgsType = {
  maskedFlow: ReactFlowJsonObject<any, any> | null;
  callback?: () => any;
};

function useOnCloseIDE({ maskedFlow, callback }: ArgsType): void {
  const router = useRouter();

  const beforeUnload = React.useCallback(
    (e: BeforeUnloadEvent) => {
      try {
        const XForceStore = localStorage.getItem(LOCAL_HISTORY_KEY);
        const fullEmptyState = !XForceStore && !maskedFlow?.nodes.length;
        if (fullEmptyState) return;
        if (maskedFlow && XForceStore) {
          const { nodes: storeNodes, edges: storeEdges } = JSON.parse(XForceStore);
          const { nodes: stateNodes, edges: stateEdges } = maskedFlow;
          const hasChanges =
            !isEqual(JSON.stringify(storeNodes), JSON.stringify(stateNodes)) ||
            !isEqual(JSON.stringify(storeEdges), JSON.stringify(stateEdges));
          if (hasChanges) {
            e.returnValue = hasChanges; // even if you assign false, this is still going to trigger, so we need to wrap it with if block.
            callback?.();
          }
        }
      } catch (err) {
        // log
      }
    },
    [callback, maskedFlow],
  );

  React.useEffect(() => {
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [beforeUnload, router.events]);
}

export default useOnCloseIDE;
