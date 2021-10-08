import { Divider, Hidden } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback } from 'react';
import { useApplicationState } from '../../contexts/ApplicationContext';
import CategoriesFilter from '../CategoriesFilter';
import DeliverTo from '../DeliverTo';
import FilterBy from '../FilterBy';
import { FILTER_BY_TYPES } from '../FiltersDrawer/FiltersDrawerBody';
import OrderMode from '../OrderMode';
import SearchBox from '../SearchBox';

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
      // In Desktop mode, set the global query restaurants directly without a confirm button
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
    <Box sx={{ width: { md: '250px', xs: 'auto' } }}>
      <Box pr={{ md: 2 }}>
        <DeliverTo />
        <Hidden mdUp>
          <SearchBox withFilters />
        </Hidden>
      </Box>
      <Hidden mdDown>
        <Box pr={2}>
          <Divider />
          <OrderMode />
          <Divider />
        </Box>
        <Box
          pr={2}
          sx={{
            maxHeight: `calc(100vh - 245px )`,
            minHeight: `calc(100vh - 245px )`,
            overflowY: 'auto',
            overflowX: 'hidden',
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
      </Hidden>
    </Box>
  );
};

export default ShopsFeedFilters;
