import { CODE_BUILDER } from '@/components/nodes/nodeTypes';
import { ModalContext } from '@/contexts/ModalContext/Context';
import React from 'react';
import { useReactFlow } from 'reactflow';

import { ContextMenuItemType } from '@/commons/types';
import ContextMenuModal from '@/components/modals/ContextMenuModal';

type MenuItemProps = React.HTMLProps<HTMLDivElement> & {
  name: string;
};
const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { name } = props;
  return (
    <div {...props}>
      <div className="bg-gray-100 border border-gray-300 rounded skew-x-12 cursor-pointer hover:bg-gray-200 hover:border-gray-400">
        <p className="-skew-x-12 pr-8 pl-2 text-gray-700 font-medium text-sm">{name}</p>
      </div>
    </div>
  );
};

type Props = {
  onSaveGraph: () => void;
};
const TopBar: React.FC<Props> = ({ onSaveGraph }: Props) => {
  const { setModal, setPoints } = React.useContext(ModalContext);
  const { getNodes, getEdges } = useReactFlow();

  const onClickExportAsPython = () => {
    console.log(CODE_BUILDER(getNodes(), getEdges()));
  };
  const CTX_MENU__FILE: ContextMenuItemType[] = [
    { item: 'Save', onClick: onSaveGraph },
    {
      item: 'Export As',
      subs: [
        { item: 'Python Code...', onClick: onClickExportAsPython },
        { item: 'JSON Representation of the Graph...', onClick: () => null },
        { item: 'PNG...', onClick: () => null },
      ],
    },
  ];

  const onClickFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(<ContextMenuModal menu={CTX_MENU__FILE} />);
    setPoints({ top: e.pageX, left: e.pageY });
  };
  return (
    <div className={`absolute top-0 w-[calc(100vw-320px)] bg-gray-50 h-11 border-b border-b-gray-200 z-10 opacity-95`}>
      <div className="flex h-11 items-center px-4 justify-between">
        <div>
          <MenuItem name="File" onClick={onClickFile} />
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
