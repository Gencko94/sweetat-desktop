import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FILTER_TYPES } from '../../constants';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FILTER_BY_TYPES } from '../FiltersDrawer/FiltersDrawerBody';

interface IFilterByProps {
  handleChangeFilterByFilters: (key: FILTER_BY_TYPES) => void;
  checkedFilterBy: {
    free_delivery: boolean;
    is_featured: boolean;
  };
}

const FilterBy = ({
  checkedFilterBy,
  handleChangeFilterByFilters,
}: IFilterByProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion
      expanded={expanded}
      sx={{ py: 1 }}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
        <Typography
          fontWeight="bold"
          variant="subtitle1"
        >{t`filter-by`}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: theme => theme.spacing(0, 1.5),
          backgroundColor: theme => theme.palette.background.paper,
        }}
      >
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
              checked={checkedFilterBy[type.key] === true}
              onChange={() => handleChangeFilterByFilters(type.key)}
            />
          </Stack>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterBy;
