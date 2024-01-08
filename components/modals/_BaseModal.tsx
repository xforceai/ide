import { MODAL_ROOT_DIV_ID, MODAL_Z_INDEX } from '@/commons/constants';
import React from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from '../../contexts/ModalContext';

const Modal: React.FC = () => {
  const [CONTAINER, SET_CONTAINER] = React.useState<Element | null>(null);
  const { modal, points } = React.useContext(ModalContext);

  React.useEffect(() => {
    const TANK = document.getElementById(MODAL_ROOT_DIV_ID);
    SET_CONTAINER(TANK);
  }, []);

  if (!modal || !CONTAINER) return null;
  return ReactDOM.createPortal(
    <div
      className={`absolute ${MODAL_Z_INDEX}`}
      style={{ top: points.top, right: points.right, bottom: points.bottom, left: points.left }}
    >
      {modal}
    </div>,
    CONTAINER,
  );
};

export default Modal;
