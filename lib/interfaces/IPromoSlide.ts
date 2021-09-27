export type IPromoSlide = {
  id: number;
  promo_slider_id: number;
  unique_id: number | null;
  name: string;
  image: string;
  ar_image: string;
  image_placeholder: string | null;
  url: string;
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
  order_column: number;
  promo_slider: {
    id: number;
    name: string;
    is_active: 0 | 1;
    created_at: string;
    updated_at: string;
    location_id: number;
    position_id: number;
    size: number;
  };
};
