import Branch from './Branch';
import { TreeProps } from './types';

export default function Tree<T>(props: TreeProps<T>) {
  return props.data?.map((n) => <Branch key={n.id} item={n} level={0} />);
}
