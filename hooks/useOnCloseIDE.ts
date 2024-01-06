import { LOCAL_HISTORY_KEY } from '@/commons/constants';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { ReactFlowInstance } from 'reactflow';

type ArgsType = {
  reactFlowInstance?: ReactFlowInstance;
  callback?: () => any;
};

function useOnCloseIDE({ reactFlowInstance, callback }: ArgsType): void {
  const router = useRouter();

  const beforeUnload = React.useCallback(
    (e: BeforeUnloadEvent) => {
      if (!reactFlowInstance) return;
      const diff = !isEqual(
        JSON.parse(localStorage.getItem(LOCAL_HISTORY_KEY) || ''),
        reactFlowInstance?.toObject() || '',
      );
      if (diff) {
        e.preventDefault();
        e.returnValue = true;
        callback?.();
      }
    },
    [callback, reactFlowInstance],
  );

  React.useEffect(() => {
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [beforeUnload, router.events]);
}

export default useOnCloseIDE;
