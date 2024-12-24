import React from 'react';
import { DepartmentLevel } from '../../types';
import { DailyActivityChart } from './DailyActivityChart';
import { PeakHoursChart } from './PeakHoursChart';
import { ResponseTimesCard } from './ResponseTimesCard';
import { DepartmentConnectionsGraph } from './DepartmentConnectionsGraph';

interface MessageStatsProps {
  messageStats: DepartmentLevel[keyof DepartmentLevel];
  departmentId: string;
}

export const MessageStats: React.FC<MessageStatsProps> = ({ messageStats, departmentId }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DailyActivityChart dailyFrequency={messageStats.message_frequency.daily} />
        <PeakHoursChart peakHours={messageStats.peak_hours} />
      </div>

      <ResponseTimesCard responseTimes={messageStats.response_times} />

      <DepartmentConnectionsGraph 
        interactions={messageStats.department_interactions_submatrix}
        currentDepartment={departmentId}
      />
    </div>
  );
};