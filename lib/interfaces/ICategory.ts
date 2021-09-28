export interface ICategory {
  id: number;
  name: string;
  ar_name: string;
  top_restaurants: string;
  is_occasion: 0 | 1;
  header_image: string | null;
  header_video: string | null;
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
}
