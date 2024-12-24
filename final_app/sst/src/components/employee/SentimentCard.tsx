import React from 'react';

interface SentimentProfile {
  class: string;
  percentage: number;
}

interface SentimentCardProps {
  sentimentProfile: SentimentProfile[];
}

export const SentimentCard: React.FC<SentimentCardProps> = ({ sentimentProfile }) => {
  const getSentimentColor = (sentiment: string): { bg: string; border: string } => {
    // Positive sentiments
    if (['enthusiastic', 'supportive'].includes(sentiment.toLowerCase())) {
      return {
        bg: 'bg-emerald-500/60',
        border: 'border-emerald-400',
      };
    }
    
    // Neutral/Professional sentiments
    if (['constructive', 'professional'].includes(sentiment.toLowerCase())) {
      return {
        bg: 'bg-blue-500/60',
        border: 'border-blue-400',
      };
    }
    
    // Negative sentiments
    if (['passive-aggressive', 'frustrated', 'defensive'].includes(sentiment.toLowerCase())) {
      return {
        bg: 'bg-rose-500/60',
        border: 'border-rose-400',
      };
    }

    // Default fallback
    return {
      bg: 'bg-gray-500/60',
      border: 'border-gray-400',
    };
  };

  // Sort sentiments by percentage in descending order
  const sortedSentiments = [...sentimentProfile].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Sentiment Analysis</h2>
      <div className="space-y-4">
        {sortedSentiments.map((sentiment, index) => {
          const colors = getSentimentColor(sentiment.class);
          return (
            <div 
              key={index} 
              className={`bg-gray-700/50 border ${colors.border} p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg text-white font-semibold capitalize">
                  {sentiment.class}
                </span>
                <span className="text-white font-bold">
                  {sentiment.percentage}%
                </span>
              </div>
              <div className="relative w-full h-3 bg-gray-800/50 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full ${colors.bg} transition-all duration-500`}
                  style={{ width: `${sentiment.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          <span className="text-gray-300">Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500/60" />
          <span className="text-gray-300">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/60" />
          <span className="text-gray-300">Negative</span>
        </div>
      </div>
    </div>
  );
};