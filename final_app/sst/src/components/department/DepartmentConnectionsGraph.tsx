import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ConnectionMode,
} from 'reactflow';
import { DepartmentInteractionsSubmatrix } from '../../types';
import 'reactflow/dist/style.css';

interface DepartmentConnectionsGraphProps {
  interactions: DepartmentInteractionsSubmatrix;
  currentDepartment: string;
}

const departmentColors = {
  'leadership': '#3B82F6',
  'project alpha': '#10B981',
  'project beta': '#F59E0B',
  'project gamma': '#EC4899',
  'operations': '#8B5CF6',
  'technical': '#EF4444',
};

export const DepartmentConnectionsGraph: React.FC<DepartmentConnectionsGraphProps> = ({
  interactions,
  currentDepartment,
}) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Calculate max messages for scaling
  const maxMessages = Math.max(...Object.values(interactions));

  // Calculate node size based on message count
  const getNodeSize = (messages: number) => {
    const minSize = 180;
    const maxSize = 250;
    const scale = messages / maxMessages;
    return minSize + (maxSize - minSize) * scale;
  };

  // Add current department node at center
  const currentDeptMessages = interactions[currentDepartment] || 0;
  const currentDeptSize = getNodeSize(currentDeptMessages);
  
  nodes.push({
    id: currentDepartment,
    data: { 
      label: (
        <div className="text-center p-3">
          <div className="font-bold text-lg capitalize text-black">
            {currentDepartment}
          </div>
          <div className="text-sm text-black mt-1">
            {currentDeptMessages} messages
          </div>
        </div>
      )
    },
    position: { x: 250, y: 250 },
    style: {
      background: departmentColors[currentDepartment as keyof typeof departmentColors],
      padding: '8px',
      borderRadius: '12px',
      border: '3px solid rgba(255, 255, 255, 0.8)',
      width: `${currentDeptSize}px`,
      height: 'auto',
      opacity: 0.9,
    },
  });

  // Add other departments and their connections
  Object.entries(interactions).forEach(([dept, count], index) => {
    if (dept !== currentDepartment) {
      const angle = (2 * Math.PI * index) / Object.keys(interactions).length;
      const radius = 250;
      const x = 250 + radius * Math.cos(angle);
      const y = 250 + radius * Math.sin(angle);
      
      const nodeSize = getNodeSize(count);

      nodes.push({
        id: dept,
        data: { 
          label: (
            <div className="text-center p-3">
              <div className="font-bold text-lg capitalize text-black">
                {dept}
              </div>
              <div className="text-sm text-black mt-1">
                {count} messages
              </div>
            </div>
          )
        },
        position: { x, y },
        style: {
          background: departmentColors[dept as keyof typeof departmentColors],
          padding: '8px',
          borderRadius: '12px',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          width: `${nodeSize}px`,
          height: 'auto',
          opacity: 0.85,
        },
      });

      // Calculate edge thickness based on message count
      const edgeWidth = Math.max(1, Math.min(8, (count / maxMessages) * 8));

      edges.push({
        id: `${currentDepartment}-${dept}`,
        source: currentDepartment,
        target: dept,
        label: `${count}`,
        labelStyle: { 
          fill: '#000000', 
          fontWeight: 'bold',
          fontSize: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
        },
        style: { 
          stroke: '#94a3b8', 
          strokeWidth: edgeWidth,
        },
        animated: true,
        type: 'smoothstep',
      });
    }
  });

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Department Connections</h2>
      <div style={{ height: 600 }} className="bg-gray-900 rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          connectionMode={ConnectionMode.Loose}
          fitView
          minZoom={0.5}
          maxZoom={1.5}
        >
          <Background color="#ffffff" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};