import Node from '@/components/libTree/Node';
import { TreeProps } from '@/components/libTree/types';
import React from 'react';

type BranchProps<T> = {
  item: TreeProps<T>['data'][number];
  level: number;
};

function Branch<T>({ item, level }: BranchProps<T>): React.JSX.Element {
  const [expanded, setExpanded] = React.useState(item.initiallyExpanded ?? false);
  const hasChild = item?.children?.length;

  const renderSubBranches = () => {
    if (hasChild) {
      const newLevel = level + 1;
      return item?.children?.map((el) => <Branch key={el.id} item={el} level={newLevel} />);
    }
  };

  const onExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="pl-4 pt-4">
      <Node item={item} onExpand={onExpand} isExpanded={expanded} />
      {expanded && renderSubBranches()}
    </div>
  );
}

export default Branch;
