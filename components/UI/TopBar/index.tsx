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
  const [ctxMenu, setCtxMenu] = React.useState();

  const onMouseEnter = () => {
    setCtxMenu('');
  };

  return (
    <div className={`absolute top-0 w-[calc(100vw-320px)] bg-gray-50 h-11 border-b border-b-gray-200 z-10`}>
      <div className="flex h-11 items-center px-4 justify-between">
        <div>
          <MenuItem name="File" />
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
