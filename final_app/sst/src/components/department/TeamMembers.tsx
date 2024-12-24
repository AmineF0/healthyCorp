import React from 'react';
import { Link } from 'react-router-dom';
import { EmployeeProfile } from '../../types';

interface TeamMembersProps {
  members: EmployeeProfile[];
}

export const TeamMembers: React.FC<TeamMembersProps> = ({ members }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Link
            key={member.Name}
            to={`/employee/${member.Name}`}
            className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <img
                src={member["Image URL"].replace('./', '/')}
                alt={member.Name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                  {member.Name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {member["Tasks summary"]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};