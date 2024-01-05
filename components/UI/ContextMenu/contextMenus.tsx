export type MenuItemType = {
  item: React.JSX.Element;
  sub?: MenuItemType[];
};

type MenuItemProps = {
  value: string;
};
const DefaultMenuItem: React.FC<MenuItemProps> = ({ value }: MenuItemProps) => {
  return <p>{value}</p>;
};

export const nodeMenu: MenuItemType[] = [
  {
    item: <DefaultMenuItem value="Layer 1" />,
    sub: [
      { item: <DefaultMenuItem value="Layer 2 - item 1" /> },
      {
        item: <DefaultMenuItem value="Layer 2 - item 2" />,
        sub: [
          {
            item: <DefaultMenuItem value="Layer 3 - item 1" />,
            sub: [{ item: <DefaultMenuItem value="Layer 4 - item 1" /> }],
          },
        ],
      },
    ],
  },
];
