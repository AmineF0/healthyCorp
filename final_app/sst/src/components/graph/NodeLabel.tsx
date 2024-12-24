import React from 'react';
import { DEPARTMENT_ICONS } from './constants';

interface NodeLabelProps {
  nodeType: 'company' | 'department';
  label: string;
}

export const NodeLabel: React.FC<NodeLabelProps> = ({ nodeType, label }) => {
  const Icon = nodeType === 'company' 
    ? DEPARTMENT_ICONS.leadership 
    : DEPARTMENT_ICONS[label as keyof typeof DEPARTMENT_ICONS];

  return (
    <div className="flex flex-col items-center">
      <Icon className="w-6 h-6 mb-2" />
      <span className="capitalize">{label}</span>
    </div>
  );
};