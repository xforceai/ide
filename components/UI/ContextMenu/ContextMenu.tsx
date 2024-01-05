import { ContextMenuContext } from '@/contexts/ContextMenuContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { MenuItemType, nodeMenu } from './contextMenus';

type Props = React.HTMLProps<HTMLDivElement> & {};

const ContextMenuTree: React.FC<Props> = () => {
  const [CONTAINER, SET_CONTAINER] = React.useState<Element | null>(null);
  let { points, clicked } = React.useContext(ContextMenuContext);

  React.useEffect(() => {
    const TANK = document.getElementById('context-menu-modal-root');
    SET_CONTAINER(TANK);
  }, []);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // e.stopPropagation(); TODO: Do we want that?
  };
  const renderMenuItems = (items: MenuItemType[]) => {
    return items.map((item, index) => <ContextMenuBranch key={index} {...item} />);
  };

  if (!clicked || !CONTAINER) return null;
  return ReactDOM.createPortal(
    <div
      className="absolute z-50  border border-gray-300 bg-gray-200 rounded-[4px] cursor-pointer"
      style={{ top: points.y, left: points.x }}
      onClick={onClick}
    >
      <ul>{renderMenuItems(nodeMenu)}</ul>
    </div>,
    CONTAINER,
  );
};

export default ContextMenuTree;

const ContextMenuBranch: React.FC<MenuItemType> = ({ item, sub }) => {
  return (
    <li className="group relative hover:bg-gray-100 cursor-pointer p-2">
      {item}
      {sub && sub.length > 0 && (
        <ul className="hidden group-hover:block absolute left-full top-0 bg-white shadow-md rounded-md w-48">
          {sub.map((subItem, index) => (
            <ContextMenuBranch key={index} {...subItem} />
          ))}
        </ul>
      )}
    </li>
  );
};
