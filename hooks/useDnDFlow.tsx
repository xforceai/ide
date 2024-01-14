import { DATA_TRANSFER_KEY, LOCAL_HISTORY_KEY } from '@/commons/constants';
import { ContextMenuItemType } from '@/commons/types';
import { XForceNodesEnum, X_FORCE_NODES } from '@/components/LibraryPanel/nodes/nodeTypes';
import ContextMenuModal from '@/components/modals/ContextMenu/ContextMenuModal';
import ToastMessageModal from '@/components/modals/ToastMessageModal';
import { ModalContext } from '@/contexts/ModalContext';
import useDnDStore from '@/stores/useDnDStore';
import { extractNodeName } from '@/utils/nodeUtils';
import { includes } from 'lodash';
import React from 'react';
import { Connection, Edge, Node, ReactFlowJsonObject, ReactFlowProps } from 'reactflow';

type ReturnType = {
  onNodeDragOver: ReactFlowProps['onDragOver'];
  onNodeDropToWorkstation: ReactFlowProps['onDrop'];
  isValidConnection: ReactFlowProps['isValidConnection'];
  onNodeContextMenu: ReactFlowProps['onNodeContextMenu'];
  onEdgeContextMenu: ReactFlowProps['onEdgeContextMenu'];
  /**** customs ****/
  onSaveGraph: () => void;
};

function useDnDFlow(): ReturnType {
  const { rfInstance, addNode, deleteNode, deleteEdge } = useDnDStore();
  const { setModal, setPoints } = React.useContext(ModalContext);

  const onNodeDragOver: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    [],
  );
  const onNodeDropToWorkstation: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const node = JSON.parse(e.dataTransfer.getData(DATA_TRANSFER_KEY));

    if (typeof node === 'undefined' || !node) return;

    const pos = rfInstance?.screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });
    node['position'] = pos;
    addNode(node);
  };

  const isValidConnection = (connection: Connection): boolean => {
    if (!connection.source || !connection.target) return false;
    const sourceKey = extractNodeName(connection.source);
    const targetKey = extractNodeName(connection.target);

    const targetNode =
      targetKey && targetKey in XForceNodesEnum ? X_FORCE_NODES[targetKey as keyof typeof XForceNodesEnum] : null;

    if (!targetNode) return false;
    return includes(targetNode.data.connectivity.input, sourceKey);
  };

  const onNodeContextMenu = React.useCallback(
    (event: React.MouseEvent, node: Node) => {
      const CTX_MENU__NODE: ContextMenuItemType[] = [{ item: 'Delete Node', onClick: () => deleteNode(node) }];
      setModal(<ContextMenuModal menu={CTX_MENU__NODE} />);
      setPoints({ left: event.pageX, top: event.pageY });
    },
    [deleteNode, setModal, setPoints],
  );

  const onEdgeContextMenu = React.useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      const CTX_MENU__EDGE: ContextMenuItemType[] = [{ item: 'Delete Edge', onClick: () => deleteEdge(edge) }];
      setModal(<ContextMenuModal menu={CTX_MENU__EDGE} />);
      setPoints({ left: event.pageX, top: event.pageY });
    },
    [deleteEdge, setModal, setPoints],
  );

  /**** custom methods ****/
  const maskPrivateDataBeforeSave = (): ReactFlowJsonObject<Node[], Edge[]> | null => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const maskedNodes = flow.nodes.map((n) => {
        if (n.type === XForceNodesEnum.LLM_OPENAI) {
          return { ...n, data: { ...n.data, apiKey: '' } };
        }
        return n;
      });
      flow.nodes = maskedNodes;
      return flow;
    }
    return null;
  };
  const onSaveGraph = (): boolean => {
    try {
      if (rfInstance) {
        localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(maskPrivateDataBeforeSave()));
        return true;
      }
    } catch (err) {
      setModal(<ToastMessageModal msg="Oops! Something went wrong, we couldn't save your changes." />);
      return false;
    }
    return false;
  };

  return {
    onNodeDragOver,
    onNodeDropToWorkstation,
    isValidConnection,
    onNodeContextMenu,
    onEdgeContextMenu,
    onSaveGraph,
  };
}

export default useDnDFlow;
