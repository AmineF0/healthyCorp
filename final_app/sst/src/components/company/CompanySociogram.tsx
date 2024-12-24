import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ConnectionMode, useNodesState, useEdgesState
} from 'reactflow';
import { rhs } from '../../data/rhs_results';
import { profiles } from '../../data/employeeProfilesData';
import 'reactflow/dist/style.css';

const departmentColors = {
  'LEADERSHIP': '#3B82F6',
  'PROJECT ALPHA': '#10B981',
  'PROJECT BETA': '#F59E0B',
  'PROJECT GAMMA': '#EC4899',
  'OPERATIONS': '#8B5CF6',
  'TECHNICAL': '#EF4444',
};

export const CompanySociogram = () => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const seenPeople = new Set<string>();

  // Create nodes for all employees
  Object.values(profiles).forEach((person, index) => {
    const angle = (2 * Math.PI * index) / Object.keys(profiles).length;
    const radius = 300;
    const x = 400 + radius * Math.cos(angle);
    const y = 300 + radius * Math.sin(angle);

    nodes.push({
      id: person.Name,
      data: { 
        label: (
          <div className="text-center p-2">
            <div className="font-bold text-sm text-black">{person.Name}</div>
            <div className="text-xs text-black opacity-75">{person.Department}</div>
          </div>
        )
      },
      position: { x, y },
      draggable: true,
      style: {
        background: departmentColors[person.Department as keyof typeof departmentColors],
        padding: '4px',
        borderRadius: '8px',
        border: '2px solid rgba(255, 255, 255, 0.6)',
        minWidth: '150px',
        cursor: 'move',
      },
    });
    seenPeople.add(person.Name);
  });

  // Create edges for connections with high RHS scores
  rhs.forEach(conn => {
    if (conn.rhs_score >= 75) { // Only show strong connections
      const edgeStyle = {
        stroke: conn.rhs_score >= 85 ? '#10B981' : '#F59E0B',
        strokeWidth: Math.max(1, Math.min(3, (conn.rhs_score - 75) / 10)),
      };

      edges.push({
        id: `${conn.person_a}-${conn.person_b}`,
        source: conn.person_a,
        target: conn.person_b,
        style: edgeStyle,
        animated: true,
        type: 'bezier',
        label: `${conn.rhs_score.toFixed(1)}%`,
        labelStyle: { 
          fill: '#000000', 
          fontWeight: 'bold',
          fontSize: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '2px 4px',
          borderRadius: '4px',
        },
        labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
      });
    }
  });

          const [nodesG, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesG, setEdges, onEdgesChange] = useEdgesState(edges);



  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Team Connections</h2>
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