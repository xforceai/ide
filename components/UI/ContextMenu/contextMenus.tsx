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
    item: <DefaultMenuItem value="Export" />,
    sub: [
      {
        item: <DefaultMenuItem value="Python Code" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
        sub: [
          {
            item: <DefaultMenuItem value="Graph" />,
          },
          {
            item: <DefaultMenuItem value="Graph" />,
          },
          {
            item: <DefaultMenuItem value="Graph" />,
            sub: [
              {
                item: <DefaultMenuItem value="Graph" />,
              },
              {
                item: <DefaultMenuItem value="Graph" />,
              },
              {
                item: <DefaultMenuItem value="Graph" />,
              },
              {
                item: <DefaultMenuItem value="Graph" />,
              },
              {
                item: <DefaultMenuItem value="Graph" />,
              },
            ],
          },
        ],
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
        sub: [
          {
            item: <DefaultMenuItem value="Graph" />,
          },
          {
            item: <DefaultMenuItem value="Graph" />,
          },
          {
            item: <DefaultMenuItem value="Graph" />,
          },
        ],
      },
    ],
  },
  {
    item: <DefaultMenuItem value="Export" />,
    sub: [
      {
        item: <DefaultMenuItem value="Python Code" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
    ],
  },
  {
    item: <DefaultMenuItem value="Export" />,
    sub: [
      {
        item: <DefaultMenuItem value="Python Code" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
    ],
  },
  {
    item: <DefaultMenuItem value="Export" />,
    sub: [
      {
        item: <DefaultMenuItem value="Python Code" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
    ],
  },
  {
    item: <DefaultMenuItem value="Export" />,
    sub: [
      {
        item: <DefaultMenuItem value="Python Code" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
    ],
  },
  {
    item: <DefaultMenuItem value="Export" />,
    sub: [
      {
        item: <DefaultMenuItem value="Python Code" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
    ],
  },
  {
    item: <DefaultMenuItem value="Export" />,
    sub: [
      {
        item: <DefaultMenuItem value="Python Code" />,
      },
      {
        item: <DefaultMenuItem value="Graph" />,
      },
    ],
  },
];
