
import React, { useEffect, useRef, useState } from 'react';
import { Job } from '../types';

interface JobMapProps {
  jobs: Job[];
  selectedJob: Job | null;
  onJobSelect: (job: Job) => void;
}

declare global {
  interface Window {
    naver: any;
  }
}

const JobMap: React.FC<JobMapProps> = ({ jobs, selectedJob, onJobSelect }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isApiReady, setIsApiReady] = useState(false);

  // 네이버 지도 API 로드 상태 체크
  useEffect(() => {
    const checkApi = () => {
      if (window.naver && window.naver.maps && window.naver.maps.Map) {
        setIsApiReady(true);
      } else {
        setTimeout(checkApi, 100);
      }
    };
    checkApi();
  }, []);

  // 지도 초기화 및 크기 변화 감지 (ResizeObserver)
  useEffect(() => {
    if (!isApiReady || !mapElement.current || mapRef.current) return;

    const initialCenter = jobs.length > 0 
      ? new window.naver.maps.LatLng(jobs[0].lat, jobs[0].lng)
      : new window.naver.maps.LatLng(37.5665, 126.9780);

    const mapOptions = {
      center: initialCenter,
      zoom: 14,
      minZoom: 10,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT
      },
      logoControlOptions: {
        position: window.naver.maps.Position.BOTTOM_RIGHT
      }
    };

    mapRef.current = new window.naver.maps.Map(mapElement.current, mapOptions);
    
    // 리스트가 접힐 때 지도가 즉시 대응하도록 ResizeObserver 설정
    const observer = new ResizeObserver(() => {
      if (mapRef.current) {
        window.naver.maps.Event.trigger(mapRef.current, 'resize');
      }
    });

    if (mapElement.current) {
      observer.observe(mapElement.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isApiReady, jobs]);

  // 마커 생성 및 관리
  useEffect(() => {
    if (!isApiReady || !mapRef.current) return;

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    if (jobs.length === 0) return;

    const bounds = new window.naver.maps.LatLngBounds();

    jobs.forEach((job) => {
      const position = new window.naver.maps.LatLng(job.lat, job.lng);
      bounds.extend(position);

      const isActive = selectedJob?.id === job.id;
      const priceInTenThousand = (job.price / 10000).toFixed(0);

      const content = `
        <div class="custom-marker ${isActive ? 'active' : ''}" id="marker-${job.id}">
          <div class="flex flex-col items-center">
            <div class="px-3 py-1.5 rounded-full border-2 flex items-center gap-2 shadow-lg transition-all ${
              isActive 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'bg-white border-gray-800 text-gray-800 font-bold'
            }">
              <span style="font-size: 12px; font-weight: 700;">${priceInTenThousand}만</span>
              <div class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-blue-500'}"></div>
            </div>
            <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-[1px] ${
              isActive ? 'border-t-blue-600' : 'border-t-gray-800'
            }"></div>
          </div>
        </div>
      `;

      const marker = new window.naver.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          content: content,
          size: new window.naver.maps.Size(60, 40),
          anchor: new window.naver.maps.Point(30, 40),
        },
        zIndex: isActive ? 100 : 10
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        onJobSelect(job);
      });

      markersRef.current.push(marker);
    });

    if (jobs.length > 1) {
      mapRef.current.panToBounds(bounds);
    } else if (jobs.length === 1) {
      mapRef.current.panTo(new window.naver.maps.LatLng(jobs[0].lat, jobs[0].lng));
    }
  }, [isApiReady, jobs, onJobSelect, selectedJob?.id]); // selectedJob?.id 추가로 활성화 시 리렌더링 유도

  // 선택된 알바 변경 시 지도 이동
  useEffect(() => {
    if (!isApiReady || !mapRef.current || !selectedJob) return;

    const targetPos = new window.naver.maps.LatLng(selectedJob.lat, selectedJob.lng);
    mapRef.current.panTo(targetPos);

    jobs.forEach((job, index) => {
      const marker = markersRef.current[index];
      if (!marker) return;

      const isActive = selectedJob.id === job.id;
      const priceInTenThousand = (job.price / 10000).toFixed(0);

      const content = `
        <div class="custom-marker ${isActive ? 'active' : ''}">
          <div class="flex flex-col items-center">
            <div class="px-3 py-1.5 rounded-full border-2 flex items-center gap-2 shadow-lg transition-all ${
              isActive 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'bg-white border-gray-800 text-gray-800 font-bold'
            }">
              <span style="font-size: 12px; font-weight: 700;">${priceInTenThousand}만</span>
              <div class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-blue-500'}"></div>
            </div>
            <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-[1px] ${
              isActive ? 'border-t-blue-600' : 'border-t-gray-800'
            }"></div>
          </div>
        </div>
      `;
      
      marker.setIcon({
        content: content,
        size: new window.naver.maps.Size(60, 40),
        anchor: new window.naver.maps.Point(30, 40),
      });
      marker.setZIndex(isActive ? 100 : 10);
    });
  }, [isApiReady, selectedJob, jobs]);

  return (
    <div className="w-full h-full relative" style={{ minHeight: '100%' }}>
      <div 
        ref={mapElement} 
        className="w-full h-full bg-[#f1f3f5]" 
        style={{ width: '100%', height: '100%' }}
      />
      
      {!isApiReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-bold text-gray-600">네이버 지도를 불러오는 중입니다...</p>
        </div>
      )}

      <div className="absolute bottom-6 left-6 pointer-events-none z-10">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 px-4 py-2 rounded-full text-[12px] text-gray-700 shadow-xl font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
          실시간 위치 기반 알바 정보
        </div>
      </div>
    </div>
  );
};

export default JobMap;
