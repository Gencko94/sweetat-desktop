import {
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Accordion as MuiAccordion,
  Typography,
  AccordionProps,
  AccordionSummaryProps,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Box, styled } from '@mui/system';
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { ITEM } from '../../../../lib/interfaces/IRestaurantItem';
import { ITEM_VIEW } from '../../../contexts/ApplicationContext';
import ItemCard from '../../ItemCard';
import ItemCardWide from '../../ItemCardWide';
import { useInView } from 'react-intersection-observer';
interface IShopItemsSection {
  items: ITEM[];
  title: string;
  setActiveTab: Dispatch<SetStateAction<number>>;
  index: number;
  itemsView: ITEM_VIEW;
}

const ShopItemsSection = memo(
  ({ items, title, index, setActiveTab, itemsView }: IShopItemsSection) => {
    const { ref, inView } = useInView({
      /* Optional options */
      threshold: 0.7,
      // rootMargin: "calc(100vh- 48px)",
    });
    const [expanded, setExpanded] = useState<boolean>(true);

    const handleExpandTab = () => {
      setExpanded(!expanded);
    };
    useEffect(() => {
      if (inView) {
        setActiveTab(index);
      }
    }, [inView, index, setActiveTab]);
    return (
      <Box ref={ref}>
        <Accordion
          elevation={0}
          expanded={expanded}
          id={title}
          onChange={() => handleExpandTab()}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography fontWeight="bold">
              {title} ({items.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {itemsView === 'wide' ? (
              <WideItemsGrid>
                {items.map(item => (
                  <ItemCardWide key={item.id} item={item as ITEM} />
                ))}
              </WideItemsGrid>
            ) : (
              <ItemsGrid>
                {items.map(item => (
                  <ItemCard key={item.id} item={item as ITEM} />
                ))}
              </ItemsGrid>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
);

export default ShopItemsSection;
const ItemsGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))',
  gap: theme.spacing(2),
  padding: '1rem 0.5rem',
}));
const WideItemsGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
  gap: theme.spacing(2),
  padding: '1rem 0.5rem',
}));
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  backgroundColor: 'transparent',
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
  padding: theme.spacing(0, 0),
}));
