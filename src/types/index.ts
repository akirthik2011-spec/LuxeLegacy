export interface Product {
  id: number;
  name: string;
  category: 'Gifts' | 'Art & Decor' | 'Accessories' | 'Home & Living';
  description: string;
  detailedStory?: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  materials: string[];
  dimensions?: string;
  dispatchTime: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  giftNote?: string;
}

export interface CustomOrderRequest {
  fullName: string;
  phone: string;
  category: string;
  budget: string;
  description: string;
  needByDate?: string;
}
