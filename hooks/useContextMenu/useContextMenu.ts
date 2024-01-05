import React from 'react';
import { ContextMenuHookReturnType } from '@/hooks/useContextMenu';
import { ContextMenuModalType } from './types';

export const useContextMenu = (): ContextMenuHookReturnType => {
  const [ctxMenuModal, setCtxMenuModal] = React.useState<ContextMenuModalType[] | null>(null);
  const [points, setPoints] = React.useState({
    x: 0,
    y: 0,
  });

  return {
    ctxMenuModal,
    setCtxMenuModal,
    points,
    setPoints,
  };
};
