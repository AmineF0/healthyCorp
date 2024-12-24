import { Brain, Rocket, Target, Users, Cog, Code } from 'lucide-react';

export const DEPARTMENT_ICONS = {
  leadership: Brain,
  'project alpha': Rocket,
  'project beta': Target,
  'project gamma': Users,
  operations: Cog,
  technical: Code,
} as const;

export const GRAPH_STYLES = {
  spacing: 200,
  startX: 100,
  nodeStyles: {
    company: 'bg-blue-500 text-white rounded-lg p-4 cursor-pointer hover:bg-blue-600 transition-colors',
    department: 'bg-green-500 text-white rounded-lg p-4 cursor-pointer hover:bg-green-600 transition-colors',
    employee: 'bg-purple-500 text-white rounded-lg p-2 cursor-pointer hover:bg-purple-600 transition-colors text-sm',
  },
  edgeStyles: {
    company: { stroke: '#4299e1' },
    department: { stroke: '#48bb78' },
  },
} as const;