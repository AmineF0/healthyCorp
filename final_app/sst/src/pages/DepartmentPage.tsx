import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { departments } from '../data/companyData';
import { profiles } from '../data/employeeProfilesData';
import { departmentStats } from '../data/departmentStatistics';
import { messageStatistics } from '../data/messageStatistics';
import { DepartmentHeader } from '../components/department/DepartmentHeader';
import { DepartmentStats } from '../components/department/DepartmentStats';
import { TeamMembers } from '../components/department/TeamMembers';
import { MessageStats } from '../components/department/MessageStats';

function DepartmentPage() {
  const { id } = useParams();
  const departmentId = id?.toLowerCase() || '';
  const departmentMembers = departments[departmentId as keyof typeof departments] || [];
  const stats = departmentStats[departmentId as keyof typeof departmentStats];
  const messageStats = messageStatistics.department_level[departmentId];
  
  const teamMembers = departmentMembers
    .map(name => profiles[name])
    .filter(Boolean);

  if (!departmentMembers.length || !stats || !messageStats) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Department Not Found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <div className="space-y-8">
          <DepartmentHeader 
            departmentId={departmentId} 
            memberCount={departmentMembers.length} 
          />
          
          <DepartmentStats stats={stats} />
          
          <MessageStats 
            messageStats={messageStats}
            departmentId={departmentId}
          />
          
          <TeamMembers members={teamMembers} />
        </div>
      </div>
    </div>
  );
}

export default DepartmentPage;