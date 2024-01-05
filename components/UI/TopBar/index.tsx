import { ContextMenuContext } from '@/contexts/ContextMenuContext';
import React from 'react';

type MenuItemProps = React.HTMLProps<HTMLDivElement> & {
  name: string;
};
const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { name } = props;
  return (
    <div {...props}>
      <div className="bg-gray-100 border border-gray-300 rounded skew-x-12 cursor-pointer">
        <p className="-skew-x-12 pr-8 pl-2 text-gray-700 font-medium text-sm">{name}</p>
      </div>
    </div>
  );
};

const TopBar: React.FC = () => {
  const { setClicked, setPoints } = React.useContext(ContextMenuContext);

  const x = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('clicked');
    setClicked(true);
    setPoints({ x: e.pageX, y: e.pageY });
  };
  return (
    <div className={`absolute top-0 w-[calc(100vw-320px)] bg-gray-50 h-11 border-b border-b-gray-200 z-10 opacity-95`}>
      <div className="flex h-11 items-center px-4 justify-between">
        <div>
          <MenuItem name="File" onContextMenu={x} />
        </div>
        <div className="flex">
          <MenuItem name="About" />
          <MenuItem name="Mission" className="ml-2" />
          <MenuItem name="Contribute" className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
