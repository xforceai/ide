import React from 'react';

type UseModalContextReturnType = {
  modal: React.JSX.Element | null;
  setModal: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
};

function useModalContext(): UseModalContextReturnType {
  const [modal, setModal] = React.useState<UseModalContextReturnType['modal']>(null);
  return { modal, setModal };
}

export default useModalContext;
