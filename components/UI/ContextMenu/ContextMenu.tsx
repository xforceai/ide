import { ContextMenuContext } from '@/contexts/ContextMenuContext';
import { ContextMenuModalType } from '@/hooks/useContextMenu/types';
import React from 'react';
import ReactDOM from 'react-dom';

type Props = React.HTMLProps<HTMLDivElement> & {};

const ContextMenuModal: React.FC<Props> = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  let { points, ctxMenuModal, setCtxMenuModal } = React.useContext(ContextMenuContext);
  const [CONTAINER, SET_CONTAINER] = React.useState<Element | null>(null);

  React.useEffect(() => {
    const TANK = document.getElementById('context-menu-modal-root');
    SET_CONTAINER(TANK);
  }, []);

  React.useEffect(() => {
    const onClick = () => {
      // if (ref.current && !ref.current.contains(e.target as Node)) {} // TODO: Probably we don't want this.
      setCtxMenuModal(null);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [setCtxMenuModal]);

  const renderMenuItems = () => {
    return ctxMenuModal?.map((item, index) => <ContextMenuBranch key={index} {...item} />);
  };

  if (!ctxMenuModal || !CONTAINER) return null;

  return ReactDOM.createPortal(
    <div
      className="absolute z-10 border border-gray-300 bg-gray-200 rounded-[4px] cursor-pointer select-none"
      style={{ top: points.y, left: points.x }}
      ref={ref}
    >
      <ul>{renderMenuItems()}</ul>
    </div>,
    CONTAINER,
  );
};

export default ContextMenuModal;

const ContextMenuBranch: React.FC<ContextMenuModalType> = (props) => {
  const { sub } = props;
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
      <ContextMenuNode {...props} />
      {renderSubs()}
    </li>
  );
};

const ContextMenuNode: React.FC<ContextMenuModalType> = (props) => {
  return (
    <p
      className="hover:text-white hover:bg-sky-400 pl-2 pr-12 text-gray-700 text-sm z-30"
      style={{ borderRadius: 'inherit' }}
      {...props}
    >
      {props.name}
    </p>
  );
};
