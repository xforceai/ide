import { ModalContext } from '@/contexts/ModalContext';
import React from 'react';

type ContextMenuModalPropsType = {
  msg: string;
};
const ToastMessageModal: React.FC<ContextMenuModalPropsType> = ({ msg }) => {
  const { setModal } = React.useContext(ModalContext);
  React.useEffect(() => {
    const timer = setTimeout(() => setModal(null), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setModal]);
  return (
    <div
      className="bg-white border border-gray-300 rounded-[4px] cursor-pointer select-none pr-24 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="pl-4 text-sm text-gray-600">{msg}</p>
    </div>
  );
};

export default ToastMessageModal;
