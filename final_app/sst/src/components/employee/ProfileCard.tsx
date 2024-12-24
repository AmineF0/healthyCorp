import React from 'react';
import { EmployeeProfile } from '../../types';

interface ProfileCardProps {
  profile: EmployeeProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  // Fix image path by removing the dot
  const imagePath = profile["Image URL"].replace('./', '/');
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img 
            src={imagePath}
            alt={profile.Name}
            className="w-full h-64 object-contain rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-white mb-2">{profile.Name}</h2>
          <p className="text-blue-400 mb-4">{profile.Department}</p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-1">Profile</h3>
              <p className="text-gray-400">{profile.Profile}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-1">Tasks Summary</h3>
              <p className="text-gray-400">{profile["Tasks summary"]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};