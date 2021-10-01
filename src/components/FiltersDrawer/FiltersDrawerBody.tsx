import { styled } from '@mui/system';
import { memo, useCallback, useState } from 'react';
import { FILTER_TYPES } from '../../constants';
import {
  AccordionSummaryProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Accordion as MuiAccordion,
  AccordionProps,
  Typography,
  Stack,
  Checkbox,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CHECKED_FILTERS } from '.';
import { useRouter } from 'next/dist/client/router';
import { useTranslation } from 'react-i18next';
import { useGetRestaurantsCategories } from '../../hooks/queryHooks/useGetRestaurantsCategories';

interface IFiltersDrawerBodyProps {
  handleCheckFilters: (key: string) => void;
  checkedFilters: CHECKED_FILTERS;
  handleCheckCategories: (id: number) => void;
}
const FiltersDrawerBody = ({
  handleCheckFilters,
  checkedFilters,
  handleCheckCategories,
}: IFiltersDrawerBodyProps) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const { data: categories } = useGetRestaurantsCategories();
  const [filterTabs, setFilterTabs] = useState<number[]>([0, 1]);
  const handleExpandFilterTabs = useCallback(
    (tab: number) => {
      if (filterTabs.includes(tab)) {
        setFilterTabs(prev => prev.filter(i => i !== tab));
      } else {
        setFilterTabs(prev => [...prev, tab]);
      }
    },
    [filterTabs]
  );

  return (
    <>
      <Accordion
        expanded={filterTabs.includes(0)}
        onChange={() => handleExpandFilterTabs(0)}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography
            color="primary.main"
            fontWeight="bold"
            variant="subtitle1"
          >{t`filter-by`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {FILTER_TYPES.map(type => (
            <Stack
              key={type.key}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="label"
                htmlFor={type.key}
                fontWeight="medium"
                sx={{ cursor: 'pointer' }}
              >
                {t(type.label)}
              </Typography>
              <Checkbox
                id={type.key}
                checked={checkedFilters.filters[type.key] === true}
                onChange={() => handleCheckFilters(type.key)}
              />
            </Stack>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={filterTabs.includes(1)}
        onChange={() => handleExpandFilterTabs(1)}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography
            color="primary.main"
            fontWeight="bold"
            variant="subtitle1"
          >{t`categories`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categories?.map(category => (
            <Stack
              key={category.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="label"
                htmlFor={category.id.toString()}
                fontWeight="medium"
                sx={{ cursor: 'pointer' }}
              >
                {locale === 'ar' ? category.ar_name : category.name}
              </Typography>
              <Checkbox
                checked={checkedFilters.categories.includes(category.id)}
                onChange={() => handleCheckCategories(category.id)}
                id={category.id.toString()}
              />
            </Stack>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default memo(FiltersDrawerBody);
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowDownIcon />} {...props} />
))(() => ({
  padding: 0,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  backgroundColor: theme.palette.background.paper,
  //   borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
