import { MODAL_ROOT_DIV_ID, MODAL_Z_INDEX } from '@/commons/constants';
import { ModalContext } from '@/contexts/ModalContext';
import React from 'react';
import ReactDOM from 'react-dom';

const Modal: React.FC = () => {
  const [CONTAINER, SET_CONTAINER] = React.useState<Element | null>(null);
  const { modal } = React.useContext(ModalContext);

  React.useEffect(() => {
    const TANK = document.getElementById(MODAL_ROOT_DIV_ID);
    SET_CONTAINER(TANK);
  }, []);
  if (!modal || !CONTAINER) return null;

  return ReactDOM.createPortal(
    <div className={`${MODAL_Z_INDEX} absolute top-0 left-0 h-screen w-full flex items-center justify-center`}>
      {modal}
    </div>,
    CONTAINER,
  );
};

export default Modal;
