
import React, { useState, useEffect } from 'react';
import { Job } from '../types';

interface JobDetailPageProps {
  job: Job;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ job }) => {
  const [activeTab, setActiveTab] = useState('방 정보');
  const [currentImage, setCurrentImage] = useState(job.imageUrl);
  const detail = job.detailInfo;

  // job이 변경될 때 (다른 알바를 열 때) 이미지 초기화
  useEffect(() => {
    setCurrentImage(job.imageUrl);
  }, [job.id, job.imageUrl]);

  return (
    <div className="pt-16 pb-20 bg-white min-h-screen">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
        <p className="text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {job.location}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-12">
        {/* Left Content Area */}
        <div className="flex-grow lg:w-2/3">
          {/* Main Image View */}
          <div className="relative mb-6">
            <img 
              src={currentImage} 
              className="w-full h-[350px] md:h-[500px] object-cover rounded-xl shadow-sm transition-all duration-300" 
              alt="Main" 
            />
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
              {job.images?.indexOf(currentImage) !== -1 ? (job.images?.indexOf(currentImage) || 0) + 1 : 1} / {job.images?.length || 1}
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
            {job.images?.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                onClick={() => setCurrentImage(img)}
                className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer transition-all ${currentImage === img ? 'ring-2 ring-black opacity-100' : 'opacity-60 hover:opacity-100'}`} 
                alt={`Thumb ${idx}`} 
              />
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 sticky top-16 bg-white z-20 mt-8 mb-12">
            {['방 정보', '계약 정보', '후기', '호스트 정보'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-8 py-4 text-xs md:text-sm font-bold transition-all ${activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sections based on image */}
          <section className="space-y-16">
            {/* 구조 */}
            <div>
              <h3 className="text-xl font-bold mb-8">구조</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: '방', val: detail?.structure?.rooms || 0 },
                  { label: '욕실', val: detail?.structure?.bathrooms || 0 },
                  { label: '주방', val: detail?.structure?.kitchen || 0 },
                  { label: '거실', val: detail?.structure?.livingRoom || 0 }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl">🏠</div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="font-bold">{item.val}개</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 건물 유형 및 면적 */}
            <div>
              <h3 className="text-xl font-bold mb-8">건물 유형 및 면적</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl">🏢</div>
                  <div>
                    <p className="text-xs text-gray-400">건물 유형</p>
                    <p className="font-bold">{detail?.propertyType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl">📐</div>
                  <div>
                    <p className="text-xs text-gray-400">전용 면적</p>
                    <p className="font-bold">{detail?.area}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 소개 */}
            <div>
              <h3 className="text-xl font-bold mb-6">알바 소개</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {job.description}
                {"\n\n"}
                성심성의껏 최선을 다하겠습니다. 많은 관심 부탁드립니다!
              </p>
            </div>

            {/* 기본 옵션 */}
            <div>
              <h3 className="text-xl font-bold mb-8">기본 옵션</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {detail?.basicOptions?.map(opt => (
                  <div key={opt} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl">✨</div>
                    <span className="text-[10px] font-medium text-gray-500">{opt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 후기 Section */}
            <div id="reviews">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">후기</h3>
                <div className="flex items-center gap-2">
                   <span className="text-2xl font-black text-blue-600">★ {job.rating}</span>
                   <span className="text-gray-400 text-sm">({job.reviewCount}개)</span>
                </div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-yellow-400 text-sm">★★★★★</span>
                       <span className="text-xs text-gray-400">2024년 11월 | 이*주</span>
                    </div>
                    <p className="text-sm font-bold mb-1">만족합니다</p>
                    <p className="text-sm text-gray-600">정말 친절하시고 결과물도 완벽했습니다. 다음에도 꼭 다시 이용하고 싶어요!</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 호스트 소개 */}
            <div className="p-6 md:p-8 border border-gray-100 rounded-3xl bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                 <img src={detail?.host?.imageUrl} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" alt="Host" />
                 <div>
                    <h4 className="font-bold text-lg">{detail?.host?.name}</h4>
                    <p className="text-xs text-blue-600 font-bold">본인인증 완료</p>
                 </div>
                 <button className="md:ml-auto px-6 py-2 border border-gray-200 bg-white rounded-xl text-sm font-bold hover:bg-gray-50">
                   호스트와 채팅하기
                 </button>
              </div>
              <p className="text-sm text-gray-500">{detail?.host?.intro}</p>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5 bg-white">
            <div className="flex items-center justify-between mb-8">
               <span className="text-sm text-gray-400 font-medium">최소 예약 기간 <span className="text-black font-bold ml-2">1주</span></span>
               <div className="flex gap-2">
                 <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeWidth="2"/></svg>
                 </button>
                 <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="2"/></svg>
                 </button>
               </div>
            </div>
            
            <div className="mb-8">
               <p className="text-2xl md:text-3xl font-black mb-1">{job.price.toLocaleString()}원 <span className="text-sm font-normal text-gray-400">/ {job.priceUnit}</span></p>
               <div className="flex justify-between text-xs text-gray-400 mt-2">
                 <span>임대료 350,000원</span>
                 <span>관리비 30,000원</span>
               </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl mb-8 flex justify-between items-center">
               <span className="text-xs text-gray-500 font-bold">할인</span>
               <span className="text-xs text-blue-600 font-bold">장기계약 시 최대 -20%</span>
            </div>

            <button className="w-full py-4 md:py-5 bg-black text-white rounded-2xl font-bold text-base md:text-lg hover:bg-gray-800 transition-colors">
              계약 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
