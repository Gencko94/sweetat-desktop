import { ITEM } from '../interfaces/IRestaurantItem';

export const product1: ITEM = {
  id: 1,
  restaurant_id: 1,
  item_category_id: '4,15',
  name: 'Chocolate Cake',
  ar_name: 'كيك شوكولا',
  price: '5.00',
  old_price: '0.00',
  image: '/assets/img/items/1608549667DHWX9Xi4Ob.jpg',
  preparation_time: 5,
  is_recommended: 1,
  is_popular: 1,
  is_new: 1,
  desc:
    '<p><span style="color: rgb(33, 37, 41); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;">Flourless chocolate cake has always been our favorite dessert</span><br></p>',
  ar_desc: '<p>كيك شوكولا دون طحين</p>',
  placeholder_image: null,
  is_active: 1,
  is_veg: 0,
  disable_cod: 0,
  in_stock: null,
  max_allowed: 1,
  category_name: 'كيك',
  addon_categories: [
    {
      id: 1,
      name: 'Eastern Sweet',
      ar_name: 'حلويات شرقي',
      type: 'MULTI',
      required_choices: 2,
      max_allowed: 0,
      user_id: 1,
      created_at: '2020-12-07 22:15:10',
      updated_at: '2021-02-02 00:24:59',
      description: null,
      ar_description: null,
      pivot: {
        item_id: 1,
        addon_category_id: 1,
      },
      addons: [
        {
          id: 1,
          name: 'Extra Cheese',
          ar_name: null,
          price: '0.30',
          addon_category_id: 1,
          user_id: 1,
          created_at: '2020-12-07 22:16:45',
          updated_at: '2021-02-01 22:57:31',
          is_active: 1,
        },
        {
          id: 2,
          name: 'Extra Pepperoni',
          ar_name: null,
          price: '0.20',
          addon_category_id: 1,
          user_id: 1,
          created_at: '2020-12-07 22:16:45',
          updated_at: '2021-02-01 22:57:34',
          is_active: 1,
        },
        {
          id: 3,
          name: 'Extra Ketchup',
          ar_name: null,
          price: '0.20',
          addon_category_id: 1,
          user_id: 1,
          created_at: '2020-12-07 22:16:45',
          updated_at: '2021-02-01 22:57:36',
          is_active: 1,
        },
      ],
    },
    {
      id: 2,
      name: 'Ice Cream',
      ar_name: 'مثلجات',
      type: 'SINGLE',
      required_choices: 0,
      max_allowed: 0,
      user_id: 1,
      created_at: '2020-12-07 22:16:59',
      updated_at: '2020-12-12 17:43:38',
      description: null,
      ar_description: null,
      pivot: {
        item_id: 1,
        addon_category_id: 2,
      },
      addons: [
        {
          id: 4,
          name: 'Regular',
          ar_name: null,
          price: '0.00',
          addon_category_id: 2,
          user_id: 1,
          created_at: '2020-12-07 22:17:27',
          updated_at: '2020-12-07 22:17:27',
          is_active: 1,
        },
        {
          id: 5,
          name: 'Pan Based',
          ar_name: null,
          price: '0.50',
          addon_category_id: 2,
          user_id: 1,
          created_at: '2020-12-07 22:17:27',
          updated_at: '2021-02-01 22:58:54',
          is_active: 1,
        },
      ],
    },
  ],
};
