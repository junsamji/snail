
import React, { useState, useEffect, useMemo } from 'react';
import { Job, Category } from '../types';
import { MOCK_JOBS } from '../constants';
import JobCard from './JobCard';
import JobMap from './JobMap';

// Augmenting Window interface to include naver property for map functionality
declare global {
  interface Window {
    naver: any;
  }
}

interface JobSearchPageProps {
  initialCategory?: Category;
}

const JobSearchPage: React.FC<JobSearchPageProps> = ({ initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(initialCategory || 'all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [mapBounds, setMapBounds] = useState<any>(null);

  // 카테고리 및 검색어 필터링된 기본 알바 목록
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesCat = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesQuery = job.title.includes(searchQuery) || job.location.includes(searchQuery);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // 지도 반경 내에 있는 알바 필터링 (선택된 잡이 없을 때 목록에 표시될 대상)
  const jobsInBounds = useMemo(() => {
    if (!mapBounds || !window.naver) return filteredJobs;
    return filteredJobs.filter(job => {
      const pos = new window.naver.maps.LatLng(job.lat, job.lng);
      return mapBounds.hasLatLng(pos);
    });
  }, [filteredJobs, mapBounds]);

  // 목록에 표시할 최종 데이터
  const listJobs = selectedJob ? [selectedJob] : jobsInBounds;

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
            onClick={() => {setSearchQuery(''); setSelectedCategory('all'); setSelectedJob(null);}}
            className="px-3 py-1.5 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50 font-medium"
          >
            초기화
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        {/* Map View - Mobile 60% */}
        <div className="flex-grow order-1 md:order-2 h-[60%] md:h-full relative bg-gray-50 overflow-hidden">
          <JobMap 
            jobs={filteredJobs} 
            selectedJob={selectedJob} 
            onJobSelect={(job) => setSelectedJob(job)} 
            onBoundsChange={(bounds) => setMapBounds(bounds)}
          />
        </div>

        {/* Left List View - Mobile 40% */}
        <div 
          className={`
            bg-white border-gray-100 flex flex-col transition-all duration-300 ease-in-out z-20 overflow-hidden
            ${isListCollapsed ? 'md:w-0 md:opacity-0 md:min-w-0' : 'md:w-[450px] lg:w-[500px] md:min-w-[400px] md:border-r'}
            order-2 md:order-1 h-[40%] md:h-full w-full shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-none
          `}
        >
          <div className="p-3 border-b border-gray-50 flex items-center justify-between shrink-0">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-tight">
              {selectedJob ? '선택된 알바 정보' : `목록 ${listJobs.length}`}
            </h2>
            <div className="md:hidden">
               <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto p-3 hide-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 pb-10">
              {listJobs.length > 0 ? (
                listJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isActive={selectedJob?.id === job.id}
                    onClick={(j) => setSelectedJob(j)} 
                  />
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-gray-400">
                  <p className="text-sm font-medium">검색 결과가 없습니다.</p>
                  <p className="text-xs mt-1">다른 지역으로 이동해 보세요.</p>
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
      </div>
    </div>
  );
};

export default JobSearchPage;
