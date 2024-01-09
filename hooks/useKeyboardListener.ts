import { ModalContext } from '@/contexts/ModalContext';
import React, { ReactElement } from 'react';

type ArgsType = {
  onSave?: {
    f: () => void;
    msg: ReactElement;
  };
};
function useKeyboardListener({ onSave }: ArgsType) {
  const { setModal, setPoints } = React.useContext(ModalContext);

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        onSave?.f();
        setModal(onSave?.msg || null);
        setPoints({ bottom: 44, right: 44 });
      }
    },
    [onSave, setModal, setPoints],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
}

export default useKeyboardListener;
