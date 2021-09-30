import {
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Accordion as MuiAccordion,
  Stack,
  Typography,
  AccordionProps,
  AccordionSummaryProps,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { ITEM } from "../../../../lib/interfaces/IRestaurantItem";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import ItemCard from "../../ItemCard";
import ItemCardWide from "../../ItemCardWide";

interface IShopItemsSection {
  items: ITEM[];
  title: string;
}

const ShopItemsSection = ({ items, title }: IShopItemsSection) => {
  const { itemsView } = useContext(ApplicationContext);
  const [expanded, setExpanded] = useState<boolean>(true);

  const handleExpandTab = () => {
    setExpanded(!expanded);
  };
  return (
    <Accordion
      elevation={0}
      expanded={expanded}
      onChange={() => handleExpandTab()}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography fontWeight="bold">
          {title} ({items.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {itemsView === "wide" ? (
          <Stack spacing={2} py={2}>
            {items.map((item) => (
              <ItemCardWide key={item.id} item={item as ITEM} />
            ))}
          </Stack>
        ) : (
          <ItemsGrid>
            {items.map((item) => (
              <ItemCard key={item.id} item={item as ITEM} />
            ))}
          </ItemsGrid>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ShopItemsSection;
const ItemsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))",
  gap: theme.spacing(2),
  padding: "1rem 0.5rem",
}));
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "transparent",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowDownIcon />} {...props} />
))(() => ({
  padding: 0,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 0),
}));
