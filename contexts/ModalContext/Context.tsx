import { PositionType } from '@/commons/types';
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
