import React from 'react';

type TreeNodeProps = {
  name: string;
  content: React.JSX.Element;
};
const ItemSkeleton: React.FC<TreeNodeProps> = ({ name, content }: TreeNodeProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm mt-2 w-60">
      <div className="bg-gray-100 border-b border-b-gray-200">
        <p className="px-2 py-1 font-bold text">{name}</p>
      </div>
      <div className="bg-white p-2">{content}</div>
    </div>
  );
};

export default ItemSkeleton;
