import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/dist/client/router';
import { useGetRestaurantsCategories } from '../../hooks/queryHooks/useGetRestaurantsCategories';
interface ICategoriesFilterProps {
  handleCheckCategories: (key: number) => void;
  checkedCategories: number[];
}
const CategoriesFilter = ({
  checkedCategories,
  handleCheckCategories,
}: ICategoriesFilterProps) => {
  const { data: categories } = useGetRestaurantsCategories();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const { locale } = useRouter();
  return (
    <Accordion
      sx={{ py: 1 }}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
        <Typography
          fontWeight="bold"
          variant="subtitle1"
        >{t`categories`}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: theme => theme.spacing(0, 1.5),
          backgroundColor: theme => theme.palette.background.paper,
        }}
      >
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
              checked={checkedCategories.includes(category.id)}
              onChange={() => handleCheckCategories(category.id)}
              id={category.id.toString()}
            />
          </Stack>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoriesFilter;
