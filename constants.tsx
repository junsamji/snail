
import { Category, Job, Review } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    category: Category.CLEANING,
    title: '성동구 옥수동 오피스텔 입주청소',
    location: '성동구 옥수동',
    price: 150000,
    priceUnit: '건',
    imageUrl: 'https://picsum.photos/seed/clean1/400/300',
    isPopular: true,
    tags: ['방1', '화장실1', '주방1', '거실1'],
    description: '한남/이태원 풀옵션 오피스텔 청소 전문가를 모십니다.',
    lat: 37.545,
    lng: 127.012,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: '2',
    category: Category.PET_WALKING,
    title: '상도동 골든리트리버 저녁 산책',
    location: '동작구 상도동',
    price: 25000,
    priceUnit: '시간',
    imageUrl: 'https://picsum.photos/seed/dog1/400/300',
    isPopular: true,
    tags: ['대형견가능', '주말우대'],
    description: '성격 좋은 리트리버와 함께 산책하실 분!',
    lat: 37.502,
    lng: 126.947,
    rating: 4.9,
    reviewCount: 56
  },
  {
    id: '3',
    category: Category.MOVING,
    title: '서대문구 원룸 소형 용달 이사',
    location: '서대문구 북가좌동',
    price: 80000,
    priceUnit: '건',
    imageUrl: 'https://picsum.photos/seed/move1/400/300',
    tags: ['명지대 주차o', '깔끔원룸'],
    description: '간단한 짐 이동 도와주실 용달 기사님 구합니다.',
    lat: 37.581,
    lng: 126.911,
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: '4',
    category: Category.CLEANING,
    title: '강남구 역삼동 투룸 거주청소',
    location: '강남구 역삼동',
    price: 215000,
    priceUnit: '건',
    imageUrl: 'https://picsum.photos/seed/clean2/400/300',
    tags: ['당일지급', '전문장비제공'],
    description: '이사 전 꼼꼼하게 청소해주실 분을 찾습니다.',
    lat: 37.498,
    lng: 127.027,
    rating: 5.0,
    reviewCount: 12
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: '김*현',
    rating: 5,
    content: '청소가 너무 깔끔해요. 덕분에 기분 좋게 입주했습니다.',
    location: '제주특별자치도 제주시',
    jobTitle: '침대(3/6인) 2층집 청소',
    imageUrl: 'https://picsum.photos/seed/rev1/400/300'
  },
  {
    id: 'r2',
    author: '이*준',
    rating: 5,
    content: '강아지가 너무 좋아하네요. 다음에도 꼭 부탁드리고 싶어요.',
    location: '서울 강북구 미아동',
    jobTitle: '대형견 산책 서비스',
    imageUrl: 'https://picsum.photos/seed/rev2/400/300'
  },
  {
    id: 'r3',
    author: '박*서',
    rating: 4,
    content: '친절하시고 짐도 조심히 옮겨주셨습니다. 만족해요!',
    location: '부산 해운대구',
    jobTitle: '원룸 용달 이사',
    imageUrl: 'https://picsum.photos/seed/rev3/400/300'
  }
];
