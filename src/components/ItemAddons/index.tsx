import { Stack } from '@mui/material';

import { ADDON_CATEGORY } from '../../../lib/interfaces/IRestaurantItem';
import MultiItemAddons from './MultiItemAddons';

import SingleItemAddons from './SingleItemAddons';
interface IItemAddonsProps {
  addon_categories: ADDON_CATEGORY[];
}

const ItemAddons = ({ addon_categories }: IItemAddonsProps) => {
  return (
    <Stack spacing={3}>
      {addon_categories.map(addonCategory => {
        if (addonCategory.type === 'SINGLE') {
          return (
            <SingleItemAddons
              key={addonCategory.id}
              addonCategory={addonCategory}
            />
          );
        } else if (addonCategory.type === 'MULTI') {
          return (
            <MultiItemAddons
              key={addonCategory.id}
              addonCategory={addonCategory}
            />
          );
        }
      })}
    </Stack>
  );
};

export default ItemAddons;
