import { ContextMenuItemType } from '@/commons/types';
import DefaultContextMenuItem from '@/components/modals/ContextMenu/DefaultContextMenuItem';
import React from 'react';

const ContextMenuItem: React.FC<ContextMenuItemType> = (props) => {
  const [isChildrenVisible, setChildrenVisible] = React.useState(false);
  const hasChildren = props.subs ?? false;

  const renderChildren = () => {
    return (
      <ul
        className={`absolute left-full top-1 border border-gray-300 bg-gray-200 cursor-pointer rounded-[4px] ${
          isChildrenVisible ? 'block' : 'hidden'
        }`}
      >
        {props.subs?.map((subItem, index) => (
          <ContextMenuItem key={index} {...subItem} />
        ))}
      </ul>
    );
  };

  return (
    <li
      className={`relative whitespace-nowrap border-b border-b-gray-300 last:border-none first:rounded-t-[3px] last:rounded-b-[3px] ${
        isChildrenVisible ? 'bg-gray-300' : ''
      }`}
      onMouseEnter={() => setChildrenVisible(true)}
      onMouseLeave={() => setChildrenVisible(false)}
    >
      {typeof props.item === 'string' ? <DefaultContextMenuItem {...props} /> : props.item}
      {hasChildren && renderChildren()}
    </li>
  );
};

export default ContextMenuItem;
