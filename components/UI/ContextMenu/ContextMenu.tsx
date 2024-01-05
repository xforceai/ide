import { ContextMenuContext } from '@/contexts/ContextMenuContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { MenuItemType, nodeMenu } from './contextMenus';

type Props = React.HTMLProps<HTMLDivElement> & {};

const ContextMenuModal: React.FC<Props> = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  let { points, clicked, setClicked } = React.useContext(ContextMenuContext);
  const [CONTAINER, SET_CONTAINER] = React.useState<Element | null>(null);

  React.useEffect(() => {
    const TANK = document.getElementById('context-menu-modal-root');
    SET_CONTAINER(TANK);
  }, []);

  React.useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setClicked(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [setClicked]);

  const renderMenuItems = (items: MenuItemType[]) => {
    return items.map((item, index) => <ContextMenuBranch key={index} {...item} />);
  };

  if (!clicked || !CONTAINER) return null;

  return ReactDOM.createPortal(
    <div
      className="absolute z-10 border border-gray-300 bg-gray-200 rounded-[4px] cursor-pointer select-none"
      style={{ top: points.y, left: points.x }}
      ref={ref}
    >
      <ul>{renderMenuItems(nodeMenu)}</ul>
    </div>,
    CONTAINER,
  );
};

export default ContextMenuModal;

const ContextMenuBranch: React.FC<MenuItemType> = ({ item, sub }) => {
  const [isChildVisible, setChildVisible] = React.useState(false);

  const renderSubs = () => {
    if (sub) {
      return (
        <ul
          className={`absolute left-full top-1 border border-gray-300 bg-gray-200 cursor-pointer rounded-[4px] ${
            isChildVisible ? 'block' : 'hidden'
          }`}
        >
          {sub.map((subItem, index) => (
            <ContextMenuBranch key={index} {...subItem} />
          ))}
        </ul>
      );
    }
  };
  return (
    <li
      className={`relative whitespace-nowrap border-b border-b-gray-300 last:border-none first:rounded-t-[3px] last:rounded-b-[3px] ${
        isChildVisible ? 'bg-gray-300' : ''
      }`}
      onMouseEnter={() => setChildVisible(true)}
      onMouseLeave={() => setChildVisible(false)}
    >
      <ContextMenuNode item={item} />
      {renderSubs()}
    </li>
  );
};

const ContextMenuNode: React.FC<MenuItemType> = ({ item }) => {
  return (
    <p className="hover:text-white hover:bg-sky-400 pl-2 pr-12 py-1 text-sm z-30" style={{ borderRadius: 'inherit' }}>
      {item}
    </p>
  );
};
