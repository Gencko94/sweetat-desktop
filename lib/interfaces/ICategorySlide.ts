export type ICategorySlide = {
  id: number;
  name: string;
  image: string;
  image_placeholder: string;
  color: string;
  font_color: string;
  categories_ids: {
    value: number;
    label: string;
    ar_label: string;
    is_occasion: 0 | 1;
  }[];
};
