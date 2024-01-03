import React from 'react';
import { XForceNodeType, X_FORCE_NODES } from './nodes/nodeTypes';
import { v4 as uuidv4 } from 'uuid';

const LibraryPanel = () => {
  const onDragStart = (event: React.DragEvent, node: XForceNodeType) => {
    const newNode = {...node, id: `${node.id}__${uuidv4()}`}
    event.dataTransfer.setData('application/reactflow', JSON.stringify(newNode));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div>Library</div>
      <div onDragStart={(event) => onDragStart(event, X_FORCE_NODES.GROUP_CHAT)} draggable>
         GroupChat
      </div>
      <div onDragStart={(event) => onDragStart(event, X_FORCE_NODES.USER_PROXY)} draggable>
        User Proxy
      </div>
      <div onDragStart={(event) => onDragStart(event, X_FORCE_NODES.GPT_ASSISTANT_AGENT)} draggable>
        GPTAssistantAgent
      </div>
      <div onDragStart={(event) => onDragStart(event, X_FORCE_NODES.CUSTOM_FUNCTION)} draggable>
        Custom Function
      </div>
      {/* 
      <div onDragStart={(event) => onDragStart(event, X_FORCE_NODES.GROUP_CHAT)} draggable>
        JSONParser
      </div>
      <div onDragStart={(event) => onDragStart(event, X_FORCE_NODES.GROUP_CHAT)} draggable>
        File Output
      </div>
      */}
    </aside>
  );
};

export default LibraryPanel;
