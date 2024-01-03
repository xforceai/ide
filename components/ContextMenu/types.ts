export type CtxMenuType = {
  id: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export type ContextMenuArgsType = {
  menu: CtxMenuType;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
