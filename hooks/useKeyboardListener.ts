import React from 'react';

type ArgsType = {
  onSaveCmd?: () => any;
};
function useKeyboardListener({ onSaveCmd }: ArgsType) {
  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        onSaveCmd?.();
      }
    },
    [onSaveCmd],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
}

export default useKeyboardListener;
