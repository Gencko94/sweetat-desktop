import { Drawer, Container, Button } from '@mui/material';

import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useRouter } from 'next/dist/client/router';
import { useTranslation } from 'react-i18next';

import FiltersDrawerHeader from './FiltersDrawerHeader';
import FiltersDrawerBody from './FiltersDrawerBody';

export interface CHECKED_FILTERS {
  filters: {
    [key: string]: boolean;
  };
  categories: number[];
}

const FiltersDrawer = () => {
  const [checkedFilters, setCheckedFilters] = useState<CHECKED_FILTERS>({
    filters: { featured: false, free_delivery: false },
    categories: [],
  });

  const { t } = useTranslation();
  const { locale } = useRouter();

  const [state, setState] = useApplicationState();

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
  const handleCheckFilters = useCallback((key: string) => {
    setCheckedFilters(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: !prev.filters[key],
      },
    }));
  }, []);
  const handleCloseFiltersMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      filtersMenuOpen: !prev.filtersMenuOpen,
    }));
  }, [setState]);
  // ✨ Applying global filters handler.
  const handleApplyFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      globalFilters: {
        ...prev.globalFilters,
        filters: {
          ...state.globalFilters.filters,
          category_ids: checkedFilters.categories.map(i => i.toString()),
          free_delivery: checkedFilters.filters.free_delivery,
          is_featured: checkedFilters.filters.is_featured,
        },
      },
      // 👋 close the drawer
      filtersMenuOpen: !prev.filtersMenuOpen,
    }));
  }, [
    checkedFilters.categories,
    checkedFilters.filters.free_delivery,
    checkedFilters.filters.is_featured,
    setState,
    state.globalFilters.filters,
  ]);

  useEffect(() => {
    // ✨ Update the local filter state whenever the global filter state changes.
    setCheckedFilters({
      categories: state.globalFilters.filters.category_ids.map(i => Number(i)),
      filters: {
        free_delivery: !!state.globalFilters.filters.free_delivery,
        is_featured: !!state.globalFilters.filters.is_featured,
      },
    });
  }, [
    state.globalFilters.filters.category_ids,
    state.globalFilters.filters.free_delivery,
    state.globalFilters.filters.is_featured,
    state.filtersMenuOpen,
  ]);

  // 🎈💣 ```filtersOpen``` dep is to reset the filter if the drawer is closed and not updated the global state.

  return (
    <Drawer
      anchor={locale === 'en' ? 'right' : 'left'}
      open={state.filtersMenuOpen}
      onClose={() => handleCloseFiltersMenu()}
      //   PaperProps={{ sx: { right: "100px" } }}
    >
      <Container sx={{ p: 2, minWidth: { md: '400px', xs: '300px' } }}>
        <FiltersDrawerHeader handleCloseFiltersMenu={handleCloseFiltersMenu} />
        <Box
          sx={{
            maxHeight: `calc(100vh - 245px )`,
            minHeight: `calc(100vh - 245px )`,
            overflowY: 'auto',
            overflowX: 'hidden',
            my: 1,
          }}
        >
          <FiltersDrawerBody
            checkedFilters={checkedFilters}
            handleCheckFilters={handleCheckFilters}
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
      </Container>
    </Drawer>
  );
};

export default FiltersDrawer;
