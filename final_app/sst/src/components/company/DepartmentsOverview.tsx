import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Rocket, Target, Users, Cog, Code } from 'lucide-react';
import { departments } from '../../data/companyData';

const departmentIcons = {
  'leadership': Brain,
  'project alpha': Rocket,
  'project beta': Target,
  'project gamma': Users,
  'operations': Cog,
  'technical': Code,
} as const;

export const DepartmentsOverview = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Departments</h2>
      <div className="grid gap-4">
        {Object.entries(departments).map(([dept, members]) => {
          const Icon = departmentIcons[dept as keyof typeof departmentIcons] || Code;
          return (
            <Link
              key={dept}
              to={`/department/${dept}`}
              className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-600/50 rounded-lg group-hover:bg-gray-600">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {dept}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {members.length} members
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};