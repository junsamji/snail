
import React from 'react';
import { Category } from '../types';
import { MOCK_REVIEWS } from '../constants';

interface LandingPageProps {
  onSearchClick: (category?: Category) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSearchClick }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-4 py-16 md:px-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          잠깐 할 수 있는 <br />
          <span className="text-blue-600">알바를 찾아보세요</span>
        </h1>
        
        <div className="relative mt-12 mb-8 group">
          <input 
            type="text" 
            placeholder="지역, 알바 종류 등을 입력해 주세요"
            className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-lg pr-24"
          />
          <button 
            onClick={() => onSearchClick()}
            className="absolute right-2 top-2 bottom-2 bg-black text-white px-8 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            검색
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { cat: Category.CLEANING, icon: '🏠', desc: '새 집처럼 깨끗하게' },
            { cat: Category.PET_WALKING, icon: '🐶', desc: '함께 걷는 즐거움' },
            { cat: Category.MOVING, icon: '📦', desc: '빠르고 안전한 이사' }
          ].map((item) => (
            <div 
              key={item.cat}
              onClick={() => onSearchClick(item.cat)}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group text-left relative overflow-hidden"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-1 flex items-center justify-between">
                {item.cat}
                <svg className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
              <div className="absolute bottom-0 right-0 p-2 opacity-5">
                 <div className="w-16 h-16 bg-black rounded-full transform translate-x-4 translate-y-4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-time Review Section */}
      <section className="bg-gray-50 py-20 overflow-hidden">
        <div className="px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">QuickGig 고객의 실시간 후기</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar">
            {MOCK_REVIEWS.map((review) => (
              <div key={review.id} className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img src={review.imageUrl} alt={review.jobTitle} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{review.location}</p>
                  <h4 className="font-bold mb-3 truncate">{review.jobTitle}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="px-4 py-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-600 rounded-3xl p-10 text-white relative overflow-hidden group cursor-pointer">
           <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-2">후기 쓰면<br/>100% 선물 증정!</h3>
             <p className="opacity-80">업무 완료 후 간단한 후기를 남겨주세요</p>
           </div>
           <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full group-hover:scale-125 transition-transform"></div>
        </div>
        <div className="bg-indigo-700 rounded-3xl p-10 text-white relative overflow-hidden group cursor-pointer">
           <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-2">앱 리뷰 쓰고<br/>3만 원 받자!</h3>
             <p className="opacity-80">마켓 리뷰 작성 시 추첨을 통해 지급</p>
           </div>
           <div className="absolute -top-4 -left-4 w-32 h-32 bg-black/10 rounded-full group-hover:scale-125 transition-transform"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto border-t border-gray-200 pt-12 text-sm text-gray-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h5 className="font-bold text-gray-900 mb-4">회사소개</h5>
              <p className="mb-2">공지사항</p>
              <p>인재채용</p>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-4">고객센터</h5>
              <p className="mb-2">운영 시간: 10:00-18:00</p>
              <p className="mb-2">대표 번호: 1877-3670</p>
              <button className="mt-4 px-4 py-1 border border-gray-300 rounded hover:bg-white transition-colors">1:1 문의하기</button>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-4">정보</h5>
              <p className="mb-2">이용약관</p>
              <p>개인정보 처리방침</p>
            </div>
            <div>
               <div className="flex gap-4 mb-4">
                 <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                 <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                 <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
               </div>
            </div>
          </div>
          <p className="text-xs opacity-60">(주)제이에스 | 대표자 : 지준삼 | 사업자 등록번호 : 886-81-01187 | 통신판매업 신고번호 : 2024-서울서초-0926</p>
          <p className="text-xs opacity-60 mt-2">주소 : 서울특별시 서초구 나루터로 59, 6층 | 이메일 : quickgig@spacev.kr | 제휴 문의 : biz@spacev.kr</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
