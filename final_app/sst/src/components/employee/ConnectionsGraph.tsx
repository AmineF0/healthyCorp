import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ConnectionMode, useNodesState, useEdgesState
} from 'reactflow';
import { profiles } from '../../data/employeeProfilesData';
import 'reactflow/dist/style.css';

interface ConnectionsGraphProps {
  connections: Array<{
    person_a: string;
    person_b: string;
    rhs_score: number;
  }>;
  employeeName: string;
}

const departmentColors = {
  'LEADERSHIP': '#3B82F6', // blue
  'PROJECT ALPHA': '#10B981', // green
  'PROJECT BETA': '#F59E0B', // yellow
  'PROJECT GAMMA': '#EC4899', // pink
  'OPERATIONS': '#8B5CF6', // purple
  'TECHNICAL': '#EF4444', // red
};

export const ConnectionsGraph: React.FC<ConnectionsGraphProps> = ({ connections, employeeName }) => {
  const relevantConnections = connections.filter(
    conn => conn.person_a === employeeName || conn.person_b === employeeName
  );

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const seenPeople = new Set<string>();

  // Add the main employee node
  const mainEmployee = profiles[employeeName];
  nodes.push({
    id: employeeName,
    data: { 
      label: (
        <div className="text-center p-3">
          <div className="font-bold text-lg mb-1">{employeeName}</div>
          <div className="text-sm opacity-80">{mainEmployee.Department}</div>
        </div>
      ) 
    },
    position: { x: 250, y: 250 },
    style: { 
      background: departmentColors[mainEmployee.Department],
      color: 'white',
      padding: '8px',
      borderRadius: '12px',
      border: '3px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      minWidth: '180px',
    },
  });
  seenPeople.add(employeeName);

  // Create nodes and edges for connections
  relevantConnections.forEach((conn, index) => {
    const otherPerson = conn.person_a === employeeName ? conn.person_b : conn.person_a;
    
    if (!seenPeople.has(otherPerson)) {
      const angle = (2 * Math.PI * index) / relevantConnections.length;
      const radius = 300; // Increased radius for better spacing
      const x = 250 + radius * Math.cos(angle);
      const y = 250 + radius * Math.sin(angle);
      
      const person = profiles[otherPerson];
      nodes.push({
        id: otherPerson,
        data: { 
          label: (
            <div className="text-center p-3">
              <div className="font-bold text-lg mb-1">{otherPerson}</div>
              <div className="text-sm opacity-80">{person.Department}</div>
            </div>
          ) 
        },
        position: { x, y },
        style: { 
          background: departmentColors[person.Department],
          color: 'white',
          padding: '8px',
          borderRadius: '12px',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          minWidth: '180px',
        },
      });
      seenPeople.add(otherPerson);
    }

    const score = conn.rhs_score;
    const edgeStyle = {
      stroke: score >= 80 ? '#10B981' : score >= 70 ? '#F59E0B' : '#EF4444',
      strokeWidth: 3,
    };

    edges.push({
      id: `${conn.person_a}-${conn.person_b}`,
      source: conn.person_a,
      target: conn.person_b,
      label: `${score.toFixed(1)}%`,
      labelStyle: { 
        fill: 'black', 
        fontWeight: 'bold',
        fontSize: '14px',
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))'
      },
      style: edgeStyle,
      animated: true,
      type: 'smoothstep',
    });
  });

    const [nodesG, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesG, setEdges, onEdgesChange] = useEdgesState(edges);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Team Connections</h2>
      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(departmentColors).map(([dept, color]) => (
            <div key={dept} className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm text-white">{dept}</span>
            </div>
          ))}
        </div>
      </div>
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
          
        >
          <Background color="#ffffff" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};