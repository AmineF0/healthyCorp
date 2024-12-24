import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { profiles } from '../data/employeeProfilesData';
import { employeeStats } from '../data/employeeStatistics';
import { rhs } from '../data/rhs_results';
import { sentimentProfiles } from '../data/sentiment_profiles';
import { messageStatistics } from '../data/messageStatistics';
import { employeeTasks } from '../data/employeeTasks';
import { ProfileCard } from '../components/employee/ProfileCard';
import { FrequencyCard } from '../components/employee/FrequencyCard';
import { DailyFrequencyCard } from '../components/employee/DailyFrequencyCard';
import { TaskStatsCard } from '../components/employee/TaskStatsCard';
import { TasksCard } from '../components/employee/TasksCard';
import { TopRecipientsCard } from '../components/employee/TopRecipientsCard';
import { PeopleInteractionsCard } from '../components/employee/PeopleInteractionsCard';
import { PeakHoursCard } from '../components/employee/PeakHoursCard';
import { DepartmentInteractionsCard } from '../components/employee/DepartmentInteractionsCard';
import { ConnectionsGraph } from '../components/employee/ConnectionsGraph';
import { SentimentCard } from '../components/employee/SentimentCard';
import { ResponseTimesCard } from '../components/employee/ResponseTimesCard';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function EmployeePage() {
  const { id } = useParams();
  const employee = id ? profiles[id as keyof typeof profiles] : null;
  const stats = id ? employeeStats[id as keyof typeof employeeStats] : null;
  const sentiment = sentimentProfiles.profiles.find(p => p.name === id);
  const messageStats = id ? messageStatistics.individual_level[id] : null;
  const tasks = id ? employeeTasks[id] || [] : [];

  if (!employee || !stats || !sentiment || !messageStats) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Employee Not Found</h1>
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
        
        <div className="grid gap-8">
          <ProfileCard profile={employee} />

                    <SentimentCard sentimentProfile={sentiment.sentiment_profile} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FrequencyCard 
              hourlyFrequency={messageStats.message_frequency.hourly}
              dailyFrequency={messageStats.message_frequency.daily}
            />
            <PeakHoursCard peakHours={messageStats.peak_hours} />
          </div>

          <ResponseTimesCard responseTimes={messageStats.response_times} />

          <DailyFrequencyCard dailyFrequency={messageStats.message_frequency.daily} />

          <TaskStatsCard stats={stats} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TasksCard tasks={tasks} />
            <TopRecipientsCard recipients={messageStats.top_recipients} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DepartmentInteractionsCard 
              interactions={messageStatistics.department_level[employee.Department.toLowerCase()].department_interactions_submatrix} 
            />
            {/* <PeopleInteractionsCard recipients={messageStats.top_recipients} /> */}
          </div>

          <ConnectionsGraph 
            connections={rhs}
            employeeName={employee.Name}
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;