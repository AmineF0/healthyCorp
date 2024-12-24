import { useMemo } from 'react';
import { GraphNode } from './types';
import { useCompanyNode } from './hooks/useCompanyNode';
import { useDepartmentNodes } from './hooks/useDepartmentNodes';
import { useEmployeeNodes } from './hooks/useEmployeeNodes';
import { useGraphEdges } from './hooks/useGraphEdges';

export const useGraphData = () => {
  const companyNode = useCompanyNode();
  const departmentNodes = useDepartmentNodes();
  const employeeNodes = useEmployeeNodes();
  
  const nodes = useMemo((): GraphNode[] => 
    [companyNode, ...departmentNodes, ...employeeNodes].map(node => ({
      ...node,
      data: { label: node.label, members: node.members },
      type: node.id === 'nexuscode' ? 'input' : undefined,
    })),
  [companyNode, departmentNodes, employeeNodes]);

  const edges = useGraphEdges();

  return { nodes, edges };
};