import React from 'react';
import { useReactFlow } from 'reactflow';
import { ContextMenuArgsType } from './types';

const NodeContextMenu: React.FC<ContextMenuArgsType> = (props) => {
  const { id, top, left, right, bottom } = props.menu;
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = React.useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10 bg-gray-100 border-2 border-gray-300 rounded-[4px]"
      {...props}
    >
      <button onClick={deleteNode} className="px-2 py-1 text-start rounded-[3px] hover:bg-sky-400 hover:text-white">
        Remove
      </button>
    </div>
  );
};

export default NodeContextMenu;
