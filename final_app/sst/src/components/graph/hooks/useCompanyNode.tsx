import { useMemo } from 'react';
import { NodeData } from '../types';
import { GRAPH_STYLES } from '../constants';
import { NodeLabel } from '../NodeLabel';

export const useCompanyNode = () => {
  return useMemo((): NodeData => ({
    id: 'nexuscode',
    position: { x: 500, y: 0 },
    label: <NodeLabel nodeType="company" label="NexusCode" />,
    className: GRAPH_STYLES.nodeStyles.company,
  }), []);
};