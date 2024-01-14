import { ContextMenuItemType } from '@/commons/types';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react';

const DefaultContextMenuItem: React.FC<React.HTMLProps<HTMLParagraphElement> & ContextMenuItemType> = (props) => {
  return (
    <p
      className="flex items-center justify-between hover:text-white hover:bg-sky-400 pl-2 text-gray-700 text-sm z-30"
      style={{ borderRadius: 'inherit' }}
      {...props}
    >
      <span className="pr-12">{props.item}</span>
      {props.subs ? <ChevronRightIcon width={14} height={14} /> : ''}
    </p>
  );
};

export default DefaultContextMenuItem;
