import React from 'react';

export type ContextMenuModalType = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  sub?: ContextMenuModalType[];
};

export type CartesianCoordinatesType = { x: number; y: number };

export type ContextMenuHookReturnType = {
  ctxMenuModal: ContextMenuModalType[] | null;
  setCtxMenuModal: React.Dispatch<React.SetStateAction<ContextMenuModalType[] | null>>;
  points: CartesianCoordinatesType;
  setPoints: React.Dispatch<React.SetStateAction<CartesianCoordinatesType>>;
};
