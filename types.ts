
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
  images?: string[]; // 상세 페이지용 추가 이미지들
  isPopular?: boolean;
  tags: string[];
  description: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  
  // 상세 정보 필드 추가
  detailInfo?: {
    structure?: { rooms: number; bathrooms: number; kitchen: number; livingRoom: number };
    propertyType?: string;
    area?: string;
    elevator?: string;
    parking?: string;
    basicOptions?: string[];
    additionalOptions?: string[];
    usageGuide?: string;
    maintenanceItems?: string[];
    host?: {
      name: string;
      imageUrl: string;
      intro: string;
    };
  };
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
