
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import JobSearchPage from './components/JobSearchPage';
import JobDetailPage from './components/JobDetailPage';
import { Category, Job } from './types';
import { MOCK_JOBS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'search' | 'detail'>('landing');
  const [selectedInitialCategory, setSelectedInitialCategory] = useState<Category | undefined>();
  const [detailJob, setDetailJob] = useState<Job | null>(null);

  // URL 파라미터 체크 (상세 페이지 새 탭 열기 대응)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('jobId');
    if (jobId) {
      const job = MOCK_JOBS.find(j => j.id === jobId);
      if (job) {
        setDetailJob(job);
        setView('detail');
      }
    }
  }, []);

  const handleSearchClick = (category?: Category) => {
    setSelectedInitialCategory(category);
    setView('search');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar view={view === 'detail' ? 'search' : view} setView={(v) => {
        // 상세 페이지에서 다른 곳으로 갈 때는 쿼리스트링 제거
        if (view === 'detail') window.history.pushState({}, '', '/');
        setView(v);
      }} />
      
      {view === 'landing' && (
        <LandingPage onSearchClick={handleSearchClick} />
      )}
      
      {view === 'search' && (
        <JobSearchPage initialCategory={selectedInitialCategory} />
      )}

      {view === 'detail' && detailJob && (
        <JobDetailPage job={detailJob} />
      )}

      {/* Persistent Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default App;
