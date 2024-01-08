import { PositionType } from '@/commons/types';
import Modal from '@/components/modals/_BaseModal';
import useModalContext from '@/hooks/useModalContext';
import React from 'react';

type ModalContextReturnType = {
  modal: React.JSX.Element | null;
  setModal: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
  points: PositionType;
  setPoints: React.Dispatch<React.SetStateAction<PositionType>>;
};

export const ModalContext = React.createContext<ModalContextReturnType>({
  modal: null,
  setModal: () => null,
  points: {},
  setPoints: () => null,
});

type ModalContextProviderProps = {
  children: React.JSX.Element;
};
const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const { modal, setModal, points, setPoints } = useModalContext();
  return (
    <ModalContext.Provider value={{ points, modal, setModal, setPoints }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
