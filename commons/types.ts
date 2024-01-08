export type PositionType = { top?: number; right?: number; bottom?: number; left?: number };

export type ContextMenuItemType = React.HTMLProps<HTMLDivElement> & {
  item: React.JSX.Element | string;
  subs?: ContextMenuItemType[];
};
