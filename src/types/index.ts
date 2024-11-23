export interface User {
  id: string;
  email: string;
  role: 'seller' | 'admin';
  full_name?: string;
  avatar_url?: string;
}

export interface EstateSale {
  id: string;
  title: string;
  description: string;
  address: string;
  start_date: string;
  end_date: string;
  is_private: boolean;
  seller_id: string;
  created_at: string;
  images: string[];
  status: 'draft' | 'published' | 'completed';
}

export interface Item {
  id: string;
  estate_sale_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  status: 'available' | 'sold' | 'pending';
}