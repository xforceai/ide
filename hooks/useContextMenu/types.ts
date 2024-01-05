import React from 'react';

export type CartesianCoordinatesType = { x: number; y: number };

export type ContextMenuHookReturnType = {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  points: CartesianCoordinatesType;
  setPoints: React.Dispatch<React.SetStateAction<CartesianCoordinatesType>>;
};
