
import { Category, Job, Review } from './types';

// 기본 상세 정보 템플릿
const DEFAULT_DETAIL = {
  structure: { rooms: 1, bathrooms: 1, kitchen: 1, livingRoom: 0 },
  propertyType: '오피스텔',
  area: '20m² (6평)',
  elevator: '있음',
  parking: '주차 가능',
  basicOptions: ['냉장고', '세탁기', '에어컨', '와이파이', '싱크대', '인덕션', '침대'],
  additionalOptions: ['도어락', 'CCTV', '식탁', '전자레인지', '책상', '옷장', '신발장', '발코니/베란다'],
  usageGuide: '당일 예약은 확인 후 가능합니다. 입주는 비대면으로 진행되며 입실은 14:00시 이후, 퇴실은 12:00시 이전입니다.',
  maintenanceItems: ['인터넷 요금', '공용공간 청소비', '건물관리비(CCTV 등)'],
  host: {
    name: '나진협 파트너',
    imageUrl: 'https://i.pravatar.cc/150?u=host1',
    intro: '안녕하세요! 성심성의껏 최선을 다해 도와드리겠습니다.'
  }
};

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    category: Category.CLEANING,
    title: '성동구 옥수동 오피스텔 입주청소',
    location: '성동구 옥수동 123-4',
    price: 150000,
    priceUnit: '건',
    imageUrl: 'https://picsum.photos/seed/clean1/800/600',
    images: [
      'https://picsum.photos/seed/clean1/800/600',
      'https://picsum.photos/seed/clean1_2/800/600',
      'https://picsum.photos/seed/clean1_3/800/600',
      'https://picsum.photos/seed/clean1_4/800/600'
    ],
    isPopular: true,
    tags: ['방1', '화장실1', '주방1', '거실1'],
    description: '옥수역 인근 풀옵션 오피스텔 청소 전문가를 모십니다. 구석구석 꼼꼼하게 새집처럼 만들어 드립니다.',
    lat: 37.545,
    lng: 127.012,
    rating: 4.8,
    reviewCount: 124,
    detailInfo: { ...DEFAULT_DETAIL, propertyType: '오피스텔', usageGuide: '입주 전 최소 3일 전 예약 권장합니다.' }
  },
  {
    id: '2',
    category: Category.PET_WALKING,
    title: '상도동 골든리트리버 저녁 산책',
    location: '동작구 상도동 55-1',
    price: 25000,
    priceUnit: '시간',
    imageUrl: 'https://picsum.photos/seed/dog1/800/600',
    images: [
      'https://picsum.photos/seed/dog1/800/600',
      'https://picsum.photos/seed/dog2/800/600',
      'https://picsum.photos/seed/dog3/800/600'
    ],
    isPopular: true,
    tags: ['대형견가능', '주말우대'],
    description: '성격 좋은 3살 리트리버 대박이와 함께 1시간 정도 즐겁게 산책하실 분 구합니다.',
    lat: 37.502,
    lng: 126.947,
    rating: 4.9,
    reviewCount: 56,
    detailInfo: { 
      ...DEFAULT_DETAIL, 
      propertyType: '아파트 단지 내', 
      basicOptions: ['리드줄 제공', '배변봉투 제공', '간식 제공'],
      host: { name: '이민수', imageUrl: 'https://i.pravatar.cc/150?u=host2', intro: '반려견을 진심으로 아끼시는 분을 찾습니다.' }
    }
  },
  {
    id: '3',
    category: Category.MOVING,
    title: '서대문구 원룸 소형 용달 이사',
    location: '서대문구 북가좌동 77-2',
    price: 80000,
    priceUnit: '건',
    imageUrl: 'https://picsum.photos/seed/move1/800/600',
    images: [
      'https://picsum.photos/seed/move1/800/600',
      'https://picsum.photos/seed/move2/800/600'
    ],
    tags: ['명지대 주차o', '깔끔원룸'],
    description: '1인 가구 원룸 이사입니다. 박스 짐 10개 정도이며 큰 가구는 없습니다.',
    lat: 37.581,
    lng: 126.911,
    rating: 4.7,
    reviewCount: 89,
    detailInfo: { ...DEFAULT_DETAIL, propertyType: '빌라', parking: '지상 주차장 이용' }
  }
];

// 나머지 30개 샘플에도 상세 정보 자동 생성
MOCK_JOBS.push(...Array.from({ length: 30 }).map((_, i) => {
  const id = `extra-${i}`;
  const isCleaning = i % 3 === 0;
  const isPet = i % 3 === 1;
  const cat = isCleaning ? Category.CLEANING : isPet ? Category.PET_WALKING : Category.MOVING;
  
  return {
    id,
    category: cat,
    title: `${cat} 전문 서비스 - ${i + 1}번지`,
    location: `서울시 어느 동 ${i + 10}번지`,
    price: isCleaning ? 200000 : isPet ? 20000 : 100000,
    priceUnit: isPet ? '시간' : '건' as any,
    imageUrl: `https://picsum.photos/seed/extra${i}/800/600`,
    images: [`https://picsum.photos/seed/extra${i}/800/600`, `https://picsum.photos/seed/extra${i}_2/800/600`],
    tags: ['전문가', '신속정확'],
    description: '믿고 맡겨주시면 만족하실 수 있는 최고의 서비스를 약속드립니다.',
    lat: 37.5 + (Math.random() - 0.5) * 0.2,
    lng: 127.0 + (Math.random() - 0.5) * 0.2,
    rating: 4.0 + Math.random(),
    reviewCount: Math.floor(Math.random() * 100),
    detailInfo: DEFAULT_DETAIL
  };
}));

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: '김*현',
    rating: 5,
    content: '청소가 너무 깔끔해요. 덕분에 기분 좋게 입주했습니다.',
    location: '서울 성동구',
    jobTitle: '성동구 옥수동 오피스텔 입주청소',
    imageUrl: 'https://picsum.photos/seed/rev1/400/300'
  }
];
