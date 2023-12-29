import React from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  ReactFlowInstance,
  NodeMouseHandler,
  Node,
  useOnSelectionChange,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TopBar from '@/components/topBar';
import LibraryPanel from '@/components/libraryPanel';
import InspectorPanel from '@/components/inspectorPanel';


let id = 0;
const getId = () => `dndnode_${id++}`;

const AppX = () => {
  const reactFlowWrapper = React.useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance>();

  const onConnect = React.useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onDragOver: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    [],
  );
  const onDrop: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      // @ts-ignore
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const onNodeClick: NodeMouseHandler = (event: React.MouseEvent, node: Node) => {
    // send node id to configure panel.
  };

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      console.log(nodes);
    },
  });
  return (
    <div className='flex bg-red-50 h-full'>
      <LibraryPanel />
      <div className="flex-grow" ref={reactFlowWrapper}>
      <TopBar />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Controls />
          <Background />  
        </ReactFlow>
        </div>
        <InspectorPanel />
        </div>
  );
};

export default AppX;
