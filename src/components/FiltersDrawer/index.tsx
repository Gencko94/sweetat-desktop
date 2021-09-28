import {
  AccordionSummaryProps,
  Drawer,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Accordion as MuiAccordion,
  AccordionProps,
  Typography,
  Stack,
  IconButton,
  Container,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { useRouter } from "next/dist/client/router";
import { useTranslation } from "react-i18next";

const FiltersDrawer = () => {
  const [expandedTabs, setExpandedTabs] = useState<number[]>([]);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { handleToggleFiltersMenu, filtersOpen } = useContext(
    ApplicationContext
  );
  const handleExpandTabs = (tab: number) => {
    if (expandedTabs.includes(tab)) {
      setExpandedTabs((prev) => prev.filter((i) => i !== tab));
    } else {
      setExpandedTabs((prev) => [...prev, tab]);
    }
  };
  return (
    <Drawer
      anchor={locale === "en" ? "right" : "left"}
      open={filtersOpen}
      onClose={() => handleToggleFiltersMenu()}
      //   PaperProps={{ sx: { right: "100px" } }}
    >
      <Container sx={{ p: 2, minWidth: { md: "400px", xs: "300px" } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight="bold">
            Filters
          </Typography>
          <IconButton
            sx={{ color: "primary.dark" }}
            onClick={() => {
              handleToggleFiltersMenu();
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Stack>
        <Accordion
          expanded={expandedTabs.includes(0)}
          onChange={() => handleExpandTabs(0)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography fontWeight="bold">{t`sort-by`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight="medium">{t`featured`}</Typography>
              <Checkbox />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight="medium">{t`free-delivery`}</Typography>
              <Checkbox />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight="medium">{t`delivery-time`}</Typography>
              <Checkbox />
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Drawer>
  );
};

export default FiltersDrawer;
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowDownIcon />} {...props} />
))(({ theme }) => ({
  padding: 0,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  backgroundColor: theme.palette.background.paper,
  //   borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
