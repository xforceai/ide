import { ContextMenuItemType } from '@/commons/types';
import { ModalContext } from '@/contexts/ModalContext';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react';

type ContextMenuModalPropsType = {
  menu: ContextMenuItemType[];
};
const ContextMenuModal: React.FC<ContextMenuModalPropsType> = ({ menu }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  let { setModal } = React.useContext(ModalContext);
  React.useEffect(() => {
    const onClick = (_: MouseEvent) => {
      // TODO [P2]: if ref.current contains e.target, and if e.target have a child, don't close the modal
      setModal(null);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [setModal]);

  const renderItems = () => {
    return menu?.map((menuItem, index) => <ContextMenuItem key={index} {...menuItem} />);
  };
  return (
    <div className="bg-gray-200 border border-gray-300 rounded-[4px] cursor-pointer select-none" ref={ref}>
      <ul>{renderItems()}</ul>
    </div>
  );
};

export default ContextMenuModal;

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

export const DefaultContextMenuItem: React.FC<React.HTMLProps<HTMLParagraphElement> & ContextMenuItemType> = (
  props,
) => {
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
