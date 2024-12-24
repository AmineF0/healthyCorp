import React from 'react';
import { Brain, Rocket, Target, Users, Cog, Code } from 'lucide-react';

const departmentIcons = {
  'leadership': Brain,
  'project alpha': Rocket,
  'project beta': Target,
  'project gamma': Users,
  'operations': Cog,
  'technical': Code,
} as const;

const departmentDescriptions = {
  'leadership': 'Strategic decision-making and organizational guidance, focusing on company vision and growth initiatives.',
  'project alpha': 'Pioneering innovative solutions in artificial intelligence and machine learning applications.',
  'project beta': 'Developing next-generation cloud infrastructure and scalable enterprise solutions.',
  'project gamma': 'Creating cutting-edge user experiences and digital transformation solutions.',
  'operations': 'Ensuring smooth operational workflow and maintaining system reliability.',
  'technical': 'Driving technical excellence and architectural innovations across all projects.',
} as const;

interface DepartmentHeaderProps {
  departmentId: string;
  memberCount: number;
}

export const DepartmentHeader: React.FC<DepartmentHeaderProps> = ({ departmentId, memberCount }) => {
  const Icon = departmentIcons[departmentId as keyof typeof departmentIcons] || Code;
  const description = departmentDescriptions[departmentId as keyof typeof departmentDescriptions] || '';

  return (
    <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 bg-blue-500/20 rounded-lg">
          <Icon className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white capitalize">{departmentId} Department</h1>
          <p className="text-gray-400 mt-1">{memberCount} team members</p>
        </div>
      </div>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
};