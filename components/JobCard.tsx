
import React from 'react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
      onClick={() => onClick(job)}
    >
      <div className="relative">
        <img src={job.imageUrl} alt={job.title} className="w-full h-44 object-cover" />
        {job.isPopular && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-blue-600 shadow-sm">
            인기알바
          </span>
        )}
        <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-gray-500">{job.location}</span>
        </div>
        <h4 className="font-bold text-sm mb-1 line-clamp-2 leading-tight h-10">{job.title}</h4>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {job.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-gray-50 px-1.5 py-0.5 rounded text-gray-500">{tag}</span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold">{job.price.toLocaleString()}원</span>
            <span className="text-xs text-gray-400">/ {job.priceUnit}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5 text-xs font-bold">
              <span className="text-yellow-400">★</span>
              <span>{job.rating}</span>
            </div>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[10px] text-gray-400">후기 {job.reviewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
