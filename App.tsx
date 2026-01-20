
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import JobSearchPage from './components/JobSearchPage';
import { Category } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'search'>('landing');
  const [selectedInitialCategory, setSelectedInitialCategory] = useState<Category | undefined>();

  const handleSearchClick = (category?: Category) => {
    setSelectedInitialCategory(category);
    setView('search');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar view={view} setView={setView} />
      
      {view === 'landing' ? (
        <LandingPage onSearchClick={handleSearchClick} />
      ) : (
        <JobSearchPage initialCategory={selectedInitialCategory} />
      )}

      {/* Persistent Chat Button (Common in gig apps) */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default App;
