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
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { useRouter } from "next/dist/client/router";
import { useTranslation } from "react-i18next";
import { FILTER_TYPES } from "../../constants";
import { useGetRestaurantsCategories } from "../../hooks/queryHooks/useGetRestaurantsCategories";

interface CHECKED_FILTERS {
  filters: {
    [key: string]: boolean;
  };
  categories: number[];
}

const FiltersDrawer = () => {
  const [filterTabs, setFilterTabs] = useState<number[]>([0, 1]);
  const [checkedFilters, setCheckedFilters] = useState<CHECKED_FILTERS>({
    filters: { featured: false, free_delivery: false },
    categories: [],
  });
  const { data: categories } = useGetRestaurantsCategories();
  const { t } = useTranslation();
  const { locale } = useRouter();
  const {
    handleToggleFiltersMenu,
    filtersOpen,
    globalFilters,
    handleSetGlobalFilters,
  } = useContext(ApplicationContext);
  const handleExpandFilterTabs = (tab: number) => {
    if (filterTabs.includes(tab)) {
      setFilterTabs((prev) => prev.filter((i) => i !== tab));
    } else {
      setFilterTabs((prev) => [...prev, tab]);
    }
  };
  const handleCheckCategories = (id: number) => {
    //  if the category is available in the local state
    if (checkedFilters.categories.includes(id)) {
      setCheckedFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((cat) => cat !== id),
      }));
      // else append the category to the local state
    } else {
      setCheckedFilters((prev) => ({
        ...prev,
        categories: [...prev.categories, id],
      }));
    }
  };
  const handleCheckFilters = (key: string) => {
    setCheckedFilters((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: !prev.filters[key],
      },
    }));
  };
  // ✨ Applying global filters handler.
  const handleApplyFilters = () => {
    handleSetGlobalFilters({
      ...globalFilters,
      filters: {
        ...globalFilters.filters,
        category_ids: checkedFilters.categories.map((i) => i.toString()),
        free_delivery: checkedFilters.filters.free_delivery,
        is_featured: checkedFilters.filters.is_featured,
      },
    });
    // 👋 close the drawer
    handleToggleFiltersMenu();
  };

  useEffect(() => {
    // ✨ Update the local filter state whenever the global filter state changes.
    setCheckedFilters({
      categories: globalFilters.filters.category_ids.map((i) => Number(i)),
      filters: {
        free_delivery: !!globalFilters.filters.free_delivery,
        is_featured: !!globalFilters.filters.is_featured,
      },
    });
  }, [globalFilters.filters, filtersOpen]);

  // 🎈💣 ```filtersOpen``` dep is to reset the filter if the drawer is closed and not updated the global state.

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
          <Typography variant="h5" fontWeight="bold">
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
        <Box
          sx={{
            maxHeight: `calc(100vh - 245px )`,
            minHeight: `calc(100vh - 245px )`,
            overflowY: "auto",
            overflowX: "hidden",
            my: 1,
          }}
        >
          <Accordion
            expanded={filterTabs.includes(0)}
            onChange={() => handleExpandFilterTabs(0)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography
                color="primary.main"
                fontWeight="bold"
                variant="subtitle1"
              >{t`filter-by`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {FILTER_TYPES.map((type) => (
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
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography
                color="primary.main"
                fontWeight="bold"
                variant="subtitle1"
              >{t`categories`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {categories?.map((category) => (
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
                  >
                    {locale === "ar" ? category.ar_name : category.name}
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
