export type CartesianCoordinatesType = { x: number; y: number };

export type ContextMenuItemType = React.HTMLProps<HTMLDivElement> & {
  item: React.JSX.Element | string;
  subItems?: ContextMenuItemType[];
};
