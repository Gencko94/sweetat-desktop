import { Divider, Hidden, Paper, Box } from '@mui/material';
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
    (category: { ar_name: string; name: string; id: number }) => {
      // In Desktop mode, set the global query restaurants directly without a confirm button
      if (state.restaurantsQuery.category_ids.includes(category.id)) {
        setState(prev => ({
          ...prev,
          restaurantsQuery: {
            ...prev.restaurantsQuery,
            category_ids: prev.restaurantsQuery.category_ids.filter(
              cat => cat !== category.id
            ),
          },
          shownCategories: prev.shownCategories.filter(
            cat => cat.id !== category.id
          ),
        }));
      } else {
        setState(prev => ({
          ...prev,
          restaurantsQuery: {
            ...prev.restaurantsQuery,
            category_ids: [...prev.restaurantsQuery.category_ids, category.id],
          },
          shownCategories: [...prev.shownCategories, { ...category }],
        }));
      }
    },
    [setState, state.restaurantsQuery.category_ids]
  );
  return (
    <Box
      sx={{
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 0,
        pt: { md: 2 },

        zIndex: 2,
        width: { md: '300px', xs: '100%' },
      }}
    >
      <Box
        component={Paper}
        pb={{ xs: 0, md: 2 }}
        pt={{ xs: 2, md: 0 }}
        sx={{
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          border: { md: 0 },
          borderRadius: 0,
        }}
        elevation={0}
        pr={{ md: 2 }}
      >
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
