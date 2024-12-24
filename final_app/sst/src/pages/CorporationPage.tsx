import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyHeader } from '../components/company/CompanyHeader';
import { DepartmentsOverview } from '../components/company/DepartmentsOverview';
import { PeopleOverview } from '../components/company/PeopleOverview';
import { CompanyMessageStats } from '../components/company/CompanyMessageStats';
import { CompanySociogram } from '../components/company/CompanySociogram';
import { DepartmentInteractions } from '../components/company/DepartmentInteractions';
import { CompanyTaskStats } from '../components/company/CompanyTaskStats';

function CorporationPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <div className="space-y-8">
          <CompanyHeader />
          
          <CompanyTaskStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DepartmentsOverview />
            <PeopleOverview />
          </div>

          <CompanyMessageStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CompanySociogram />
            <DepartmentInteractions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorporationPage;