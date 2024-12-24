import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  Node
} from 'reactflow';
import { useNavigate } from 'react-router-dom';
import { departments } from '../data/companyData';
import { useGraphData } from './graph/useGraphData';
import 'reactflow/dist/style.css';

const CompanyGraph = () => {
  const navigate = useNavigate();
  const { nodes: initialNodes, edges: initialEdges } = useGraphData();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.id === 'nexuscode') {
      navigate('/corporation');
    } else if (Object.keys(departments).includes(node.id)) {
      navigate(`/department/${node.id}`);
    } else {
      navigate(`/employee/${node.id}`);
    }
  }, [navigate]);

  return (
    <div className="h-[800px] bg-gray-900 rounded-xl overflow-hidden"> 
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.3 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CompanyGraph;