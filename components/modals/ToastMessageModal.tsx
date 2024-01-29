import { ModalContext } from '@/contexts/ModalContext';
import React from 'react';

type ContextMenuModalPropsType = {
  msg: string;
  style?: React.CSSProperties;
};
const ToastMessageModal: React.FC<ContextMenuModalPropsType> = ({ msg, style }) => {
  const { setModal } = React.useContext(ModalContext);
  React.useEffect(() => {
    const timer = setTimeout(() => setModal(null), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setModal]);

  React.useEffect(() => {
    // onClick anywhere else, discard the modal.
    const onClick = (_: MouseEvent) => {
      setModal(null);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [setModal]);

  return (
    <div
      className="bg-white border border-gray-300 rounded-[4px] cursor-pointer select-none pr-24 py-3 absolute"
      onClick={(e) => e.stopPropagation()}
      style={style}
    >
      <p className="pl-4 text-sm text-gray-600">{msg}</p>
    </div>
  );
};

export default ToastMessageModal;
