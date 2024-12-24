import React from 'react';
import { TopRecipient } from '../../types';
import { Users } from 'lucide-react';

interface TopRecipientsCardProps {
  recipients: TopRecipient[];
}

export const TopRecipientsCard: React.FC<TopRecipientsCardProps> = ({ recipients }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-blue-400" />
        <h2 className="text-xl font-bold text-white">Top Recipients</h2>
      </div>
      <div className="space-y-3">
        {recipients.map((recipient, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-white">{recipient.name_receiver}</span>
              <span className="text-blue-400 font-semibold">{recipient.count} messages</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};