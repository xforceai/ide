import { LOCAL_HISTORY_KEY } from '@/commons/constants';
import { XForceNodesEnum } from '@/components/UI/libraryPanel/nodes/nodeTypes';
import {
  Connection,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnInit,
  OnNodesChange,
  ReactFlowInstance,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type RFState = {
  rfInstance: ReactFlowInstance | null;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onInit: OnInit;
  // custom methods
  addNode: (node: Node) => void;
  deleteNode: (node: Node) => void;
  addNodeData: (nodeId: string, data: { [k: string]: unknown }) => void;
  deleteEdge: (edge: Edge) => void;
  clearGraph: () => void;
};

const useDnDStore = create<RFState>()(
  persist(
    (set, get) => ({
      rfInstance: null,
      nodes: [],
      edges: [],
      onNodesChange: (changes: NodeChange[]) => {
        // default reactflow prop, triggers on node drag, select, and move.
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        // default reactflow prop, triggers on edge select or remove
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        // triggers whenever user connects two nodes.
        set({
          edges: addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed } }, get().edges),
        });
      },
      onInit: (rf: ReactFlowInstance) => {
        set({ rfInstance: rf });
      },

      /**** custom methods ****/
      addNode: (node: Node) => {
        // triggers whenever users drags and drops item from panel to workstation.
        set({
          nodes: get().nodes.concat(node),
        });
      },
      deleteNode: (node: Node) => {
        // whenever user deletes a node from the workstation.
        set({
          nodes: get().nodes.filter((n) => n.id !== node.id),
          edges: get().edges.filter((e) => e.source !== node.id),
        });
      },
      addNodeData: (nodeId: string, data: { [k: string]: unknown }) => {
        set({
          nodes: get().nodes.map((n) => {
            if (n.id === nodeId) {
              return {
                ...n,
                data: {
                  ...n.data,
                  ...data,
                },
              };
            }
            return n;
          }),
        });
      },
      deleteEdge: (edge: Edge) => {
        // whenever user deletes an edge from the workstation.
        set({
          edges: get().edges.filter((e) => e.id !== edge.id),
        });
      },
      clearGraph: () => {
        set({
          nodes: [],
          edges: [],
        });
      },
    }),
    {
      name: LOCAL_HISTORY_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => {
        const maskedNodeData = state.nodes.map((n) => {
          if (n.type === XForceNodesEnum.LLM_OPENAI) {
            return { ...n, data: { ...n.data, apiKey: '' } };
          }
          return n;
        });
        state.nodes = maskedNodeData;
        return state;
      },
    },
  ),
);

export default useDnDStore;
