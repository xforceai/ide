import { PositionType } from '@/commons/types';
import React from 'react';

type UseModalContextReturnType = {
  modal: React.JSX.Element | null;
  setModal: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
  points: PositionType;
  setPoints: React.Dispatch<React.SetStateAction<PositionType>>;
};

function useModalContext(): UseModalContextReturnType {
  const [modal, setModal] = React.useState<UseModalContextReturnType['modal']>(null);
  const [points, setPoints] = React.useState<UseModalContextReturnType['points']>({});
  return { modal, setModal, points, setPoints };
}

export default useModalContext;
