import ContextMenu from '@/components/UI/ContextMenu/ContextMenu';
import { ContextMenuHookReturnType, useContextMenu } from '@/hooks/useContextMenu';
import React from 'react';

export const DefaultMenuItem: React.FC = () => {
  return <p>cc</p>;
};

export const ContextMenuContext = React.createContext<ContextMenuHookReturnType>({
  ctxMenuModal: null,
  setCtxMenuModal: () => null,
  points: { x: 0, y: 0 },
  setPoints: () => null,
});

type Props = {
  children: React.JSX.Element;
};

const ContextMenuProvider = ({ children }: Props) => {
  const { points, setPoints, ctxMenuModal, setCtxMenuModal } = useContextMenu();

  const disableDefaultContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <ContextMenuContext.Provider value={{ points, ctxMenuModal, setCtxMenuModal, setPoints }}>
      <ContextMenu />
      <div onContextMenu={disableDefaultContextMenu}>{children}</div>
    </ContextMenuContext.Provider>
  );
};

export default ContextMenuProvider;
