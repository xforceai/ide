import { ModalContext } from '@/contexts/ModalContext';
import React, { ReactElement } from 'react';

type ArgsType = {
  onSave?: {
    modal: ReactElement;
  };
};
function useKeyboardListener({ onSave }: ArgsType) {
  const { setModal } = React.useContext(ModalContext);

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (onSave) {
          setModal(onSave.modal || null);
        }
      }
    },
    [onSave, setModal],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
}

export default useKeyboardListener;
