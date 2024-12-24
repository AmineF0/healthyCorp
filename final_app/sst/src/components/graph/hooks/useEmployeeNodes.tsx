import { useMemo } from 'react';
import { departments } from '../../../data/companyData';
import { NodeData } from '../types';
import { GRAPH_STYLES } from '../constants';

export const useEmployeeNodes = () => {
  return useMemo((): NodeData[] => 
    Object.entries(departments).flatMap(([dept, members], deptIndex) =>
      members.map((member, memberIndex) => ({
        id: member,
        position: {
          x: GRAPH_STYLES.startX + deptIndex * GRAPH_STYLES.spacing,
          y: 300 + memberIndex * 80, // Stack employees vertically with 80px spacing
        },
        label: member,
        className: GRAPH_STYLES.nodeStyles.employee,
      }))
    ),
  []);
};