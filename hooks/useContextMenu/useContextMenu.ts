import React from 'react';
import { ContextMenuHookReturnType } from '@/hooks/useContextMenu';

export const useContextMenu = (): ContextMenuHookReturnType => {
  const [clicked, setClicked] = React.useState(false);
  const [points, setPoints] = React.useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    // const handleClick = () => setClicked(false);
    // document.addEventListener('click', handleClick);
    // return () => {
    //   document.removeEventListener('click', handleClick);
    // };
  }, []);

  return {
    clicked,
    setClicked,
    points,
    setPoints,
  };
};
