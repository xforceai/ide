import ContextMenu from '@/components/UI/ContextMenu/ContextMenu';
import { ContextMenuHookReturnType, useContextMenu } from '@/hooks/useContextMenu';
import React from 'react';

export const ContextMenuContext = React.createContext<ContextMenuHookReturnType>({
  clicked: false,
  points: { x: 0, y: 0 },
  setPoints: () => null,
  setClicked: () => null,
});

type Props = {
  children: React.JSX.Element;
};

const ContextMenuProvider = ({ children }: Props) => {
  const { points, setPoints, clicked, setClicked } = useContextMenu();

  const disableDefaultContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <ContextMenuContext.Provider value={{ points, clicked, setClicked, setPoints }}>
      <ContextMenu />
      <div onContextMenu={disableDefaultContextMenu}>{children}</div>
    </ContextMenuContext.Provider>
  );
};

export default ContextMenuProvider;
