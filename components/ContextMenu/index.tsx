import React from 'react';
import { useReactFlow } from 'reactflow';

export type CtxMenuType = {
  id: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

type ContextMenuArgsType = {
  menu: CtxMenuType;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ContextMenu: React.FC<ContextMenuArgsType> = (props) => {
  const { id, top, left, right, bottom } = props.menu;
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = React.useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10 bg-gray-100 border border-gray-300 rounded-md w-56"
      {...props}
    >
      <button
        onClick={deleteNode}
        className="px-4 w-full text-start rounded-md border border-gray-100 hover:bg-blue-400 hover:text-white"
      >
        Delete the Node
      </button>
    </div>
  );
};

export default ContextMenu;
