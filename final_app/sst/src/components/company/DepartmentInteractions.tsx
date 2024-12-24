import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ConnectionMode, useNodesState, useEdgesState
} from 'reactflow';
import { messageStatistics } from '../../data/messageStatistics';
import 'reactflow/dist/style.css';

const departmentColors = {
  'leadership': '#3B82F6',
  'project alpha': '#10B981',
  'project beta': '#F59E0B',
  'project gamma': '#EC4899',
  'operations': '#8B5CF6',
  'technical': '#EF4444',
};

export const DepartmentInteractions = () => {
  const matrix = messageStatistics.company_level.department_interaction_matrix_symmetrical;
  const departments = Object.keys(matrix);
  
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Create nodes for each department
  departments.forEach((dept, index) => {
    const angle = (2 * Math.PI * index) / departments.length;
    const radius = 200;
    const x = 300 + radius * Math.cos(angle);
    const y = 300 + radius * Math.sin(angle);

    nodes.push({
      id: dept,
      data: { 
        label: (
          <div className="text-center p-2">
            <div className="font-bold text-sm text-black capitalize">{dept}</div>
          </div>
        )
      },
      position: { x, y },
      draggable: true,
      style: {
        background: departmentColors[dept as keyof typeof departmentColors],
        padding: '8px',
        borderRadius: '8px',
        border: '2px solid rgba(255, 255, 255, 0.6)',
        minWidth: '120px',
        cursor: 'move',
      },
    });
  });

  // Create edges between departments
  departments.forEach(source => {
    departments.forEach(target => {
      if (source < target && matrix[source][target] > 0) {
        const value = matrix[source][target];
        const maxValue = Math.max(...Object.values(matrix).flatMap(row => Object.values(row)));
        const normalizedValue = value / maxValue;
        
        edges.push({
          id: `${source}-${target}`,
          source,
          target,
          label: value.toString(),
          labelStyle: { 
            fill: '#000000',
            fontWeight: 'bold',
            fontSize: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '2px 4px',
            borderRadius: '4px',
          },
          labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
          style: { 
            stroke: '#94A3B8',
            strokeWidth: Math.max(1, normalizedValue * 5),
          },
          animated: true,
          type: 'bezier',
        });
      }
    });
  });

        const [nodesG, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesG, setEdges, onEdgesChange] = useEdgesState(edges);


  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Department Interactions</h2>
      <div style={{ height: 700 }} className="bg-gray-900 rounded-lg">
        <ReactFlow
          nodes={nodesG}
          edges={edgesG}

          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          
          connectionMode={ConnectionMode.Loose}
          fitView
          minZoom={0.5}
          maxZoom={1.5}
          nodesDraggable={true}
        >
          <Background color="#ffffff" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};