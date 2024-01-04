import React from 'react';
import { XForceNodeType } from '../nodes/nodeTypes';

type DefaultDataProps<T> = {
  id: string;
  name: string;
  jsxElement?: React.JSX.Element;
  onDrag?: (event: React.DragEvent) => void;
  children?: DefaultDataProps<T>[];
} & T;
export type TreeProps<T> = {
  data: (DefaultDataProps<T> & T)[];
};
