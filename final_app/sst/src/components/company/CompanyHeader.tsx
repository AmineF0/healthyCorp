import React from 'react';
import { Code2, Users, Building2 } from 'lucide-react';

export const CompanyHeader = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 bg-blue-500/20 rounded-lg">
          <Building2 className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">NexusCode</h1>
          <p className="text-gray-400 mt-1">Engineering Tomorrow's Solutions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="text-blue-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Innovation</h3>
          </div>
          <p className="text-gray-300">
            Leading the way in AI and cloud solutions with cutting-edge technology
          </p>
        </div>

        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-green-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Collaboration</h3>
          </div>
          <p className="text-gray-300">
            Cross-functional teams working together to deliver exceptional results
          </p>
        </div>

        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="text-purple-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Growth</h3>
          </div>
          <p className="text-gray-300">
            Continuous expansion and development in emerging technologies
          </p>
        </div>
      </div>
    </div>
  );
};