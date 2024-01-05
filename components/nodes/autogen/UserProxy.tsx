import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  Handle,
  HandleProps,
  Position,
  getConnectedEdges,
  useNodeId,
  useReactFlow,
  useStore,
  NodeProps as ReactFlowNodeProps,
} from 'reactflow';
import { XForceNodesEnum } from '../nodeTypes';
import useNodeHelper from '../helpers/node';

export type UserProxyDataProps = {
  prompt: string;
};
type UserProxyHandlerProps = HandleProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> & { connectivity: ((args: any) => boolean) | number };

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const UserProxyHandle = (props: UserProxyHandlerProps) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isConnectable: boolean | undefined = React.useMemo(() => {
    if (typeof props.connectivity === 'function') {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);
      return props.connectivity({ node, connectedEdges });
    }

    if (typeof props.connectivity === 'number') {
      const MAX = props.connectivity;
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      const targetConnections = connectedEdges.filter((edge) => edge.source === nodeId).length;
      const sourceConnections = connectedEdges.filter((edge) => edge.target === nodeId).length;
      return props.type === 'source' ? sourceConnections < MAX : targetConnections < MAX;
    }
    return props.isConnectable;
  }, [edges, nodeId, nodeInternals, props]);

  return <Handle {...props} isConnectable={isConnectable} />;
};

const UserProxy: React.FC<ReactFlowNodeProps<UserProxyDataProps>> = (props) => {
  const { addData } = useNodeHelper(props);

  const [varName, setVarName] = React.useState('');

  const onVarNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      setVarName(val);
      addData({ varName });
    },
    [addData, varName],
  );
  const onPromptChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      setVarName(val);
      addData({ systemMessage: prompt });
    },
    [addData],
  );

  React.useEffect(() => {
    // set initial values
    addData({ varName: 'user_proxy', systemMessage: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-sm border border-gray-200 bg-white w-80">
      <div className={`${XForceNodesEnum.USER_PROXY} flex justify-between items-center border-b border-gray-200 py-2`}>
        <div className="font-bold ml-2">UserProxy</div>
        <InformationCircleIcon width={24} className="text-gray-300 mr-2" />
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>Agent Name</div>
          <input
            type="text"
            placeholder="user_proxy"
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
            onChange={onVarNameChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <div>System Message</div>
          <input
            type="text"
            placeholder="You're an helpful AI assistant, and your job is ..."
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
            onChange={onPromptChange}
          />
        </div>
      </div>
      <UserProxyHandle
        type="source"
        id="user_proxy_source"
        position={Position.Bottom}
        className="rounded-none border-none w-16 h-1"
        connectivity={2}
      />
    </div>
  );
};

export default UserProxy;
