import Modal from '@/components/modals/_BaseModal';
import useModalContext from '@/hooks/useModalContext';
import React from 'react';

type ModalContextReturnType = {
  modal: React.JSX.Element | null;
  setModal: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
};

export const ModalContext = React.createContext<ModalContextReturnType>({
  modal: null,
  setModal: () => null,
});

type ModalContextProviderProps = {
  children: React.JSX.Element;
};
const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const { modal, setModal } = useModalContext();
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
