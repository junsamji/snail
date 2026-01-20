
export enum Category {
  CLEANING = '입주청소',
  PET_WALKING = '애완동물 산책',
  MOVING = '용달 이사'
}

export interface Job {
  id: string;
  category: Category;
  title: string;
  location: string;
  price: number;
  priceUnit: '건' | '시간' | '주';
  imageUrl: string;
  isPopular?: boolean;
  tags: string[];
  description: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  location: string;
  jobTitle: string;
  imageUrl: string;
}
