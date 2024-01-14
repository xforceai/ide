import { ContextMenuItemType } from '@/commons/types';
import ContextMenuItem from '@/components/modals/ContextMenu/ContextMenuItem';
import { ModalContext } from '@/contexts/ModalContext';
import React from 'react';

type ContextMenuModalPropsType = {
  menu: ContextMenuItemType[];
};
const ContextMenuModal: React.FC<ContextMenuModalPropsType> = ({ menu }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { setModal } = React.useContext(ModalContext);
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
