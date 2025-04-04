
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeedbackStatsProps {
  averageRating: number;
  totalRatings: number;
}

export const FeedbackStats: React.FC<FeedbackStatsProps> = ({ 
  averageRating, 
  totalRatings 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">Average Rating</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            based on {totalRatings} customer ratings
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">Total Ratings</h3>
          <div className="text-3xl font-bold">
            {totalRatings}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            ratings received
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
