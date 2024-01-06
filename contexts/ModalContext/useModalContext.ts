import { CartesianCoordinatesType } from '@/commons/types';
import React from 'react';

type UseModalContextReturnType = {
  modal: React.JSX.Element | null;
  setModal: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
  points: CartesianCoordinatesType;
  setPoints: React.Dispatch<React.SetStateAction<CartesianCoordinatesType>>;
};

function useModalContext(): UseModalContextReturnType {
  const [modal, setModal] = React.useState<UseModalContextReturnType['modal']>(null);
  const [points, setPoints] = React.useState<UseModalContextReturnType['points']>({ x: 0, y: 0 });
  return { modal, setModal, points, setPoints };
}

export default useModalContext;
