
import React from 'react';

interface NavbarProps {
  view: 'landing' | 'search';
  setView: (view: 'landing' | 'search') => void;
}

const Navbar: React.FC<NavbarProps> = ({ view, setView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50 px-4 py-3 md:px-8 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setView('landing')}
      >
        <span className="text-2xl font-bold text-black italic">QuickGig</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <button onClick={() => setView('search')} className={`hover:text-blue-600 ${view === 'search' ? 'text-blue-600 font-bold' : ''}`}>지도</button>
        <button className="hover:text-blue-600">계약</button>
        <button className="hover:text-blue-600">채팅</button>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:block text-xs text-gray-400">QuickGig 파트너 시작하기</span>
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
          로그인/회원가입
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
