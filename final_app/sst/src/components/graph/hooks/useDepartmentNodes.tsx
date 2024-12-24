import { useMemo } from 'react';
import { departments } from '../../../data/companyData';
import { NodeData } from '../types';
import { GRAPH_STYLES } from '../constants';
import { NodeLabel } from '../NodeLabel';

export const useDepartmentNodes = () => {
  return useMemo((): NodeData[] => 
    Object.entries(departments).map(([dept, members], index) => ({
      id: dept,
      position: { x: GRAPH_STYLES.startX + index * GRAPH_STYLES.spacing, y: 150 },
      label: <NodeLabel nodeType="department" label={dept} />,
      className: GRAPH_STYLES.nodeStyles.department,
      members,
    })), 
  []);
};