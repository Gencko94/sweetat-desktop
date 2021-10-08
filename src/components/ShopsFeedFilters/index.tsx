import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback } from 'react';
import { useApplicationState } from '../../contexts/ApplicationContext';
import CategoriesFilter from '../CategoriesFilter';
import DeliverTo from '../DeliverTo';
import FilterBy from '../FilterBy';
import { FILTER_BY_TYPES } from '../FiltersDrawer/FiltersDrawerBody';
import MobileHeader from '../Header/MobileHeader';
import OrderMode from '../OrderMode';

const ShopsFeedFilters = () => {
  const [state, setState] = useApplicationState();
  const handleChangeFilterByFilters = useCallback(
    (key: FILTER_BY_TYPES) => {
      setState(prev => ({
        ...prev,
        restaurantsQuery: {
          ...prev.restaurantsQuery,
          [key]: !prev.restaurantsQuery[key],
        },
      }));
    },
    [setState]
  );
  const handleCheckCategories = useCallback(
    (id: number) => {
      //  if the category is available in the local state
      if (state.restaurantsQuery.category_ids.includes(id)) {
        setState(prev => ({
          ...prev,
          restaurantsQuery: {
            ...prev.restaurantsQuery,
            category_ids: prev.restaurantsQuery.category_ids.filter(
              cat => cat !== id
            ),
          },
        }));
        // else append the category to the local state
      } else {
        setState(prev => ({
          ...prev,
          restaurantsQuery: {
            ...prev.restaurantsQuery,
            category_ids: [...prev.restaurantsQuery.category_ids, id],
          },
        }));
      }
    },
    [setState, state.restaurantsQuery.category_ids]
  );
  return (
    <Box sx={{ width: '250px' }}>
      <DeliverTo />
      {/* <MobileHeader /> */}
      <Divider />
      <OrderMode />
      <Divider />
      <Box
        sx={{
          maxHeight: `calc(100vh - 245px )`,
          minHeight: `calc(100vh - 245px )`,
          overflowY: 'auto',
          overflowX: 'hidden',
          // my: 1,
        }}
      >
        <FilterBy
          checkedFilterBy={{
            free_delivery: state.restaurantsQuery.free_delivery,
            is_featured: state.restaurantsQuery.is_featured,
          }}
          handleChangeFilterByFilters={handleChangeFilterByFilters}
        />
        <Divider />
        <CategoriesFilter
          checkedCategories={state.restaurantsQuery.category_ids}
          handleCheckCategories={handleCheckCategories}
        />
      </Box>
    </Box>
  );
};

export default ShopsFeedFilters;
