import { CartesianCoordinatesType } from '@/commons/types';
import React from 'react';

type ModalContextReturnType = {
  modal: React.JSX.Element | null;
  setModal: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
  points: CartesianCoordinatesType;
  setPoints: React.Dispatch<React.SetStateAction<CartesianCoordinatesType>>;
};

export const ModalContext = React.createContext<ModalContextReturnType>({
  modal: null,
  setModal: () => null,
  points: { x: 0, y: 0 },
  setPoints: () => null,
});
