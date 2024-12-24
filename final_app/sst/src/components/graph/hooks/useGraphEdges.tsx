import { useMemo } from 'react';
import { Edge } from 'reactflow';
import { createCompanyEdges, createDepartmentEdges } from '../utils/createGraphEdges';

export const useGraphEdges = () => {
  return useMemo((): Edge[] => [
    ...createCompanyEdges(),
    ...createDepartmentEdges(),
  ], []);
};