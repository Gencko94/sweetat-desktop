import { memo, useCallback, useEffect, useState } from 'react';
import FilterBy from '../FilterBy';
import CategoriesFilter from '../CategoriesFilter';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface CHECKED_FILTERS {
  sort_by: {
    [key: string]: boolean;
  };
  categories: number[];
}

const FiltersDrawerBody = () => {
  const { t } = useTranslation();
  const [checkedFilters, setCheckedFilters] = useState<CHECKED_FILTERS>({
    sort_by: { featured: false, free_delivery: false },
    categories: [],
  });
  const [state, setState] = useApplicationState();
  const handleChangeSortByFilters = useCallback((key: string) => {
    setCheckedFilters(prev => ({
      ...prev,
      sort_by: {
        ...prev.sort_by,
        [key]: !prev.sort_by[key],
      },
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
        category_ids: checkedFilters.categories.map(i => i.toString()),
        free_delivery: checkedFilters.sort_by.free_delivery,
        is_featured: checkedFilters.sort_by.is_featured,
      },
      // 👋 close the drawer
      filtersMenuOpen: !prev.filtersMenuOpen,
    }));
  }, [
    checkedFilters.categories,
    checkedFilters.sort_by.free_delivery,
    checkedFilters.sort_by.is_featured,
    setState,
  ]);

  const handleCloseFiltersMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      filtersMenuOpen: !prev.filtersMenuOpen,
    }));
  }, [setState]);

  useEffect(() => {
    // ✨ Update the local filter state whenever the global filter state changes.
    setCheckedFilters({
      categories: state.restaurantsQuery.category_ids.map(i => Number(i)),
      sort_by: {
        free_delivery: !!state.restaurantsQuery.free_delivery,
        is_featured: !!state.restaurantsQuery.is_featured,
      },
    });
  }, [
    state.restaurantsQuery.category_ids,
    state.restaurantsQuery.free_delivery,
    state.restaurantsQuery.is_featured,
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
          checkedFilters={checkedFilters}
          handleChangeSortByFilters={handleChangeSortByFilters}
        />
        <CategoriesFilter
          checkedFilters={checkedFilters}
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
