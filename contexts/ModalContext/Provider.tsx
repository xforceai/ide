import { ModalContext } from '@/contexts/ModalContext/Context';
import Modal from '@/contexts/ModalContext/Modal';
import useModalContext from '@/contexts/ModalContext/useModalContext';

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
