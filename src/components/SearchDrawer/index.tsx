import {
  Drawer,
  Container,
  Typography,
  Stack,
  IconButton,
  ButtonGroup,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import SearchBar from "../Searchbar";
import WhiteLogo from "../../svgs/white-logo";
import { useTranslation } from "react-i18next";

const SearchDrawer = () => {
  const { t } = useTranslation();

  const {
    searchMenuOpen,
    handleToggleSearchMenu,
    globalSearchType,
    handleSetGlobalSearchType,
  } = useContext(ApplicationContext);
  return (
    <Drawer
      anchor="bottom"
      open={searchMenuOpen}
      onClose={() => handleToggleSearchMenu()}
      //   PaperProps={{ sx: { right: "100px" } }}
    >
      <Container sx={{ py: 1 }}>
        <Box
          sx={{
            maxHeight: `calc(100vh - 245px )`,
            minHeight: `calc(100vh - 245px )`,
            overflowY: "auto",
            overflowX: "hidden",
            my: 1,
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            mx={1}
            justifyContent="space-between"
          >
            <SearchBar />
            <IconButton
              size="small"
              sx={{ color: "primary.dark" }}
              onClick={() => {
                handleToggleSearchMenu();
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            my={2}
            mx={1}
            justifyContent="space-between"
          >
            <ButtonGroup>
              <Button
                variant={
                  globalSearchType === "stores" ? "contained" : "outlined"
                }
                onClick={() => handleSetGlobalSearchType("stores")}
              >
                {t`stores`}
              </Button>
              <Button
                variant={
                  globalSearchType === "items" ? "contained" : "outlined"
                }
                onClick={() => handleSetGlobalSearchType("items")}
              >
                {t`items`}
              </Button>
            </ButtonGroup>
          </Stack>
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            py={4}
            px={1}
            m={4}
          >
            <WhiteLogo />
            <Typography textAlign="center" variant="h6" my={2}>
              Enter atleast 3 characters to search...
            </Typography>
          </Box>
        </Box>
      </Container>
    </Drawer>
  );
};

export default SearchDrawer;
