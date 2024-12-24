import { Edge } from 'reactflow';
import { departments } from '../../../data/companyData';
import { GRAPH_STYLES } from '../constants';

export const createCompanyEdges = (): Edge[] =>
  Object.keys(departments).map((dept) => ({
    id: `e-nexuscode-${dept}`,
    source: 'nexuscode',
    target: dept,
    type: 'smoothstep',
    animated: true,
    style: GRAPH_STYLES.edgeStyles.company,
  }));

export const createDepartmentEdges = (): Edge[] =>
  Object.entries(departments).flatMap(([dept, members]) =>
    members.map((member) => ({
      id: `e-${dept}-${member}`,
      source: dept,
      target: member,
      type: 'smoothstep',
      animated: true,
      style: GRAPH_STYLES.edgeStyles.department,
    }))
  );