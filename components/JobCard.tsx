
import React from 'react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  isActive?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, isActive }) => {
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden border transition-all cursor-pointer flex flex-row md:flex-col h-full ${
        isActive 
          ? 'border-blue-600 shadow-lg ring-2 ring-blue-500 ring-opacity-20 translate-y-[-2px] md:translate-y-[-4px]' 
          : 'border-gray-100 hover:shadow-md'
      }`}
      onClick={() => onClick(job)}
    >
      {/* Mobile Text Content Area / Desktop Lower Area */}
      <div className="p-3 flex-grow flex flex-col min-w-0 order-1 md:order-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] md:text-xs font-medium text-gray-500 truncate">{job.location}</span>
          {isActive && <span className="text-[10px] font-bold text-blue-600">● 선택됨</span>}
        </div>
        <h4 className="font-bold text-sm mb-1 line-clamp-2 leading-tight md:h-10 text-gray-900">{job.title}</h4>
        
        <div className="hidden md:flex flex-wrap gap-1 mb-3">
          {job.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] bg-gray-50 px-1.5 py-0.5 rounded text-gray-500">{tag}</span>
          ))}
        </div>

        <div className="mt-auto flex items-baseline gap-1">
          <span className="text-base md:text-lg font-bold text-black">{job.price.toLocaleString()}원</span>
          <span className="text-[10px] md:text-xs text-gray-400">/ {job.priceUnit}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5 text-[10px] font-bold">
            <span className="text-yellow-400">★</span>
            <span>{job.rating}</span>
          </div>
          <span className="text-[10px] text-gray-400">후기 {job.reviewCount}</span>
        </div>
      </div>

      {/* Image Area - Mobile Right / Desktop Top */}
      <div className="relative w-24 h-24 md:w-full md:h-44 shrink-0 order-2 md:order-1 self-center md:self-auto m-2 md:m-0">
        <img 
          src={job.imageUrl} 
          alt={job.title} 
          className="w-full h-full object-cover rounded-lg md:rounded-none" 
        />
        {job.isPopular && (
          <span className="absolute top-1 left-1 md:top-3 md:left-3 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[8px] md:text-[10px] font-bold text-blue-600 shadow-sm">
            인기
          </span>
        )}
        <button className="hidden md:block absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
