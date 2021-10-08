import { memo, useCallback, useEffect, useState } from 'react';
import FilterBy from '../FilterBy';
import CategoriesFilter from '../CategoriesFilter';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export type SORT_BY_OPTIONS =
  | 'delivery_time'
  | 'asc'
  | 'desc'
  | 'ar_asc'
  | 'ar_desc';
export type FILTER_BY_TYPES = 'free_delivery' | 'is_featured';
export interface CHECKED_FILTERS {
  sort_by: SORT_BY_OPTIONS;
  categories: number[];
  is_featured: boolean;
  free_delivery: boolean;
}

const FiltersDrawerBody = () => {
  const { t } = useTranslation();
  const [checkedFilters, setCheckedFilters] = useState<CHECKED_FILTERS>({
    sort_by: 'delivery_time',
    categories: [],
    free_delivery: true,
    is_featured: true,
  });
  const [state, setState] = useApplicationState();
  const handleChangeFilterByFilters = useCallback((key: FILTER_BY_TYPES) => {
    setCheckedFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);
  const handleCheckCategories = useCallback(
    (id: number) => {
      //  if the category is available in the local state
      if (checkedFilters.categories.includes(id)) {
        setCheckedFilters(prev => ({
          ...prev,
          categories: prev.categories.filter(cat => cat !== id),
        }));
        // else append the category to the local state
      } else {
        setCheckedFilters(prev => ({
          ...prev,
          categories: [...prev.categories, id],
        }));
      }
    },
    [checkedFilters.categories]
  );
  // ✨ Applying global filters handler.
  const handleApplyFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      restaurantsQuery: {
        ...prev.restaurantsQuery,
        category_ids: checkedFilters.categories.map(i => i),
        free_delivery: checkedFilters.free_delivery,
        is_featured: checkedFilters.is_featured,
      },
      // 👋 close the drawer
      filtersMenuOpen: !prev.filtersMenuOpen,
    }));
  }, [
    checkedFilters.categories,
    checkedFilters.free_delivery,
    checkedFilters.is_featured,
    setState,
  ]);

  useEffect(() => {
    // ✨ Update the local filter state whenever the global filter state changes.
    setCheckedFilters({
      categories: state.restaurantsQuery.category_ids.map(i => Number(i)),
      free_delivery: !!state.restaurantsQuery.free_delivery,
      is_featured: !!state.restaurantsQuery.is_featured,
      sort_by: state.restaurantsQuery.sort_by,
    });
  }, [
    state.restaurantsQuery.category_ids,
    state.restaurantsQuery.free_delivery,
    state.restaurantsQuery.is_featured,
    state.restaurantsQuery.sort_by,
  ]);

  // 🎈💣 ```filtersOpen``` dep is to reset the filter if the drawer is closed and not updated the global state.

  return (
    <>
      <Box
        sx={{
          maxHeight: `calc(100vh - 245px )`,
          minHeight: `calc(100vh - 245px )`,
          overflowY: 'auto',
          overflowX: 'hidden',
          my: 1,
        }}
      >
        <FilterBy
          checkedFilterBy={{
            is_featured: checkedFilters.is_featured,
            free_delivery: checkedFilters.free_delivery,
          }}
          handleChangeFilterByFilters={handleChangeFilterByFilters}
        />
        <CategoriesFilter
          checkedCategories={checkedFilters.categories}
          handleCheckCategories={handleCheckCategories}
        />
      </Box>
      <Box>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mb: 1 }}
          onClick={handleApplyFilters}
        >{t`apply-filters`}</Button>
        <Button
          fullWidth
          variant="contained"
          color="inherit"
          size="large"
        >{t`clear-filters`}</Button>
      </Box>
    </>
  );
};

export default memo(FiltersDrawerBody);
