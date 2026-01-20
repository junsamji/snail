
import React, { useState, useEffect } from 'react';
import { Job, Category } from '../types';
import { MOCK_JOBS } from '../constants';
import JobCard from './JobCard';
import JobMap from './JobMap';

interface JobSearchPageProps {
  initialCategory?: Category;
}

const JobSearchPage: React.FC<JobSearchPageProps> = ({ initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(initialCategory || 'all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListCollapsed, setIsListCollapsed] = useState(false);

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesCat = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesQuery = job.title.includes(searchQuery) || job.location.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  useEffect(() => {
    setSelectedJob(null);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-[64px] h-[calc(100vh)] flex flex-col overflow-hidden bg-white">
      {/* Search & Filter Header */}
      <div className="bg-white border-b border-gray-100 p-3 flex flex-wrap items-center gap-3 z-30 shrink-0">
        <div className="relative flex-grow max-w-md">
           <input 
             type="text" 
             placeholder="지역, 알바명 등으로 검색" 
             className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
           <button className="absolute right-2 top-1.5 p-1 bg-black text-white rounded">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </button>
        </div>

        <div className="flex gap-2 text-xs overflow-x-auto hide-scrollbar pb-1 md:pb-0">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded border whitespace-nowrap transition-colors ${selectedCategory === 'all' ? 'bg-black text-white border-black font-bold' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          >
            전체
          </button>
          {Object.values(Category).map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded border whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-black text-white border-black font-bold' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 ml-auto">
          <button className="px-3 py-1.5 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-1 font-medium">
            가격순
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2"/></svg>
          </button>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
            className="px-3 py-1.5 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50 font-medium"
          >
            초기화
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        {/* Left List View */}
        <div 
          className={`
            bg-white border-gray-100 flex flex-col transition-all duration-300 ease-in-out z-20 overflow-hidden
            ${isListCollapsed ? 'md:w-0 md:opacity-0 md:min-w-0' : 'md:w-[450px] lg:w-[500px] md:min-w-[400px] md:border-r'}
            order-2 md:order-1 h-[60%] md:h-full w-full
          `}
        >
          <div className="p-4 border-b border-gray-50 flex items-center justify-between shrink-0">
            <h2 className="text-sm font-bold text-gray-400">
              총 <span className="text-black">{filteredJobs.length}</span>개의 알바 정보
            </h2>
            <div className="md:hidden">
               <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 hide-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 pb-10">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onClick={(j) => setSelectedJob(j)} 
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400">
                  <p className="text-sm">해당 조건에 맞는 알바가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Toggle Button */}
        <button 
          onClick={() => setIsListCollapsed(!isListCollapsed)}
          className={`
            hidden md:flex absolute top-1/2 -translate-y-1/2 z-30
            w-6 h-12 bg-white border border-gray-200 shadow-md rounded-r-lg
            items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all duration-300
            ${isListCollapsed ? 'left-0' : 'left-[450px] lg:left-[500px]'}
          `}
        >
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isListCollapsed ? '' : 'rotate-180'}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Map View */}
        <div className="flex-grow order-1 md:order-2 h-[40%] md:h-full relative bg-gray-50 overflow-hidden">
          <JobMap 
            jobs={filteredJobs} 
            selectedJob={selectedJob} 
            onJobSelect={setSelectedJob} 
          />
          
          {selectedJob && (
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-40 animate-in fade-in slide-in-from-bottom-4">
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2"/></svg>
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedJob.category}
                </span>
                {selectedJob.isPopular && (
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">인기</span>
                )}
              </div>
              <h3 className="font-bold text-base md:text-lg mb-1 line-clamp-1">{selectedJob.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{selectedJob.location}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div>
                   <p className="text-[10px] text-gray-400 mb-1 font-medium">예상 급여</p>
                   <p className="text-lg md:text-xl font-extrabold">{selectedJob.price.toLocaleString()}원 <span className="text-xs font-normal text-gray-400">/ {selectedJob.priceUnit}</span></p>
                </div>
                <button className="bg-black text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors text-sm">
                  지원하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;
