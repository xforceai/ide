export const NODE_NAME_REGEX = /^(.*?)__[^_]+$/;
export const extractNodeName = (name: string) => {
  const match = name.match(NODE_NAME_REGEX);
  return match ? match[1] : null;
};
