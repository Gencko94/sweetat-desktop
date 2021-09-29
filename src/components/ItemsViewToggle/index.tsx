import GridViewIcon from "@mui/icons-material/GridView";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

import { Button, IconButton, Stack } from "@mui/material";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";

const ItemsViewToggle = () => {
  const { itemsView, handleSetItemsView } = useContext(ApplicationContext);
  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant={itemsView === "wide" ? "contained" : "outlined"}
        size="small"
        onClick={() => handleSetItemsView("wide")}
      >
        <ViewStreamIcon />
      </Button>
      <Button
        variant={itemsView === "normal" ? "contained" : "outlined"}
        size="small"
        onClick={() => handleSetItemsView("normal")}
      >
        <GridViewIcon />
      </Button>
    </Stack>
  );
};

export default ItemsViewToggle;
