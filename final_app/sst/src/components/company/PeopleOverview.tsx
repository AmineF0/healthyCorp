import React from 'react';
import { Link } from 'react-router-dom';
import { profiles } from '../../data/employeeProfilesData';

export const PeopleOverview = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">People</h2>
      <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
        {Object.values(profiles).map((person) => (
          <Link
            key={person.Name}
            to={`/employee/${person.Name}`}
            className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <img
                src={person["Image URL"].replace('./', '/')}
                alt={person.Name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                  {person.Name}
                </h3>
                <p className="text-gray-400 text-sm">{person.Department}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};