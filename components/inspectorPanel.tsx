import React from 'react';

const InspectorPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeName: string) => {
    event.dataTransfer.setData('application/reactflow', nodeName);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        File Input
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'User Proxy')} draggable>
        User Proxy
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'Assistant Agent')} draggable>
        Assistant Agent
      </div>
    </aside>
  );
};

export default InspectorPanel;
