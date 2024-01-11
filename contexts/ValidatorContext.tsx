import { DnDFlowValidationSchema } from '@/commons/zod';
import useDnDStore from '@/stores/useDnDStore';
import _ from 'lodash';
import React from 'react';
import { Node } from 'reactflow';

type ErrorObjType = {
  [key: string]: {
    [key: string]: string;
  };
};

type ValidatorContextType = {
  errors: ErrorObjType;
  validate: (nds: Node[]) => void;
};

export const ValidatorContext = React.createContext<ValidatorContextType>({
  errors: {},
  validate: () => null,
});

type ModalContextProviderProps = {
  children: React.JSX.Element;
};

const ValidatorContextProvider = ({ children }: ModalContextProviderProps) => {
  const [errors, setErrors] = React.useState<ErrorObjType>({});
  const [prev, setPrev] = React.useState<{ [x: string]: string }[]>();
  const [nds, setNds] = React.useState<Node[]>([]);
  const { nodes } = useDnDStore();

  const _getZodData = React.useCallback((nds: Node[]) => {
    return nds.map(({ type, data }) => {
      return { [type as string]: data };
    });
  }, []);

  const validate = React.useCallback(
    (nds: Node[]): boolean => {
      setNds(nds);
      try {
        setErrors({});
        const zodData = _getZodData(nds);
        setPrev(zodData);
        const zodResults = DnDFlowValidationSchema.safeParse(zodData);
        // publish errors to consumers
        if (!zodResults.success) {
          const issues = zodResults.error.issues;
          const updatedErrors: ErrorObjType = {};
          issues.forEach(({ path, message }) => {
            const nodeIndex = path[0] as number;
            const nodeId = nds[nodeIndex].id;
            const fieldName = path[path.length - 1];

            if (!updatedErrors[nodeId as string]) {
              updatedErrors[nodeId as string] = {};
            }
            updatedErrors[nodeId as string][fieldName as string] = message;
          });
          setErrors(updatedErrors);
        }
        return zodResults.success;
      } catch (err) {
        // toast msg
        return true;
      }
    },
    [_getZodData],
  );

  React.useEffect(() => {
    const filteredNodes = nodes.filter((node) => nds?.find((n) => n.id === node.id));
    if (prev && !_.isEqual(_getZodData(filteredNodes), prev)) {
      // after first submission, now validate onChange.
      validate(filteredNodes);
    }
  }, [_getZodData, nds, nodes, prev, validate]);

  return <ValidatorContext.Provider value={{ errors, validate }}>{children}</ValidatorContext.Provider>;
};

export default ValidatorContextProvider;
