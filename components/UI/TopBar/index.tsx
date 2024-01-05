import { CODE_BUILDER } from '@/components/nodes/nodeTypes';
import { ContextMenuContext } from '@/contexts/ContextMenuContext';
import React from 'react';
import { useReactFlow } from 'reactflow';

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
  const { setCtxMenuModal, setPoints } = React.useContext(ContextMenuContext);
  const { getNodes, getEdges } = useReactFlow();

  const onClickExportAsPython = () => {
    console.log(CODE_BUILDER(getNodes(), getEdges()));
  };
  const onClickFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenuModal([
      { name: 'Save', onClick: onSaveGraph },
      { name: 'Export As', sub: [{ name: 'Python...', onClick: onClickExportAsPython }, { name: 'Graph...' }] },
    ]);
    setPoints({ x: e.pageX, y: e.pageY });
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
