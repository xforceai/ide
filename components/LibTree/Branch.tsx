import Node from '@/components/LibTree/Node';
import { TreeProps } from '@/components/LibTree/types';
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
    <div className="pt-2">
      <Node item={item} onExpand={onExpand} isExpanded={expanded} />
      {expanded && renderSubBranches()}
    </div>
  );
}

export default Branch;
