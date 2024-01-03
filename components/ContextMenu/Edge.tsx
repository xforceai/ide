import React from 'react';
import { useReactFlow } from 'reactflow';
import { ContextMenuArgsType } from './types';

const EdgeContextMenu: React.FC<ContextMenuArgsType> = (props) => {
  const { id, top, left, right, bottom } = props.menu;
  const { setEdges } = useReactFlow();

  const deleteEdge = React.useCallback(() => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [id, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10 bg-gray-100 border border-gray-300 rounded-md w-56"
      {...props}
    >
      <button
        onClick={deleteEdge}
        className="px-4 w-full text-start rounded-md border border-gray-100 hover:bg-blue-400 hover:text-white"
      >
        Remove Edge
      </button>
    </div>
  );
};

export default EdgeContextMenu;
