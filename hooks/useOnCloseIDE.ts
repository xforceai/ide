import { LOCAL_HISTORY_KEY } from '@/commons/constants';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { ReactFlowJsonObject, Node as ReactFlowNode } from 'reactflow';

type ArgsType = {
  maskedFlow: ReactFlowJsonObject<any, any> | null;
  callback?: () => any;
};

function useOnCloseIDE({ maskedFlow, callback }: ArgsType): void {
  const router = useRouter();

  const beforeUnload = React.useCallback(
    (e: BeforeUnloadEvent) => {
      const hasLocalStorage = localStorage.getItem(LOCAL_HISTORY_KEY) !== null;
      const hasChanges = maskedFlow !== null;
      if (!hasLocalStorage && !hasChanges) return false;
      if (!hasLocalStorage) {
        e.preventDefault();
        e.returnValue = true;
        callback?.();
        console.log('here');
        return true;
      }
      const diff = !isEqual(JSON.parse(localStorage.getItem(LOCAL_HISTORY_KEY) || ''), maskedFlow || '');
      if (diff || localStorage.getItem(LOCAL_HISTORY_KEY) == null) {
        e.preventDefault();
        e.returnValue = true;
        callback?.();
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
