import GridViewIcon from "@mui/icons-material/GridView";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

import { Button, IconButton, Stack } from "@mui/material";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";

const ItemsViewToggle = () => {
  const { itemsView, handleSetItemsView } = useContext(ApplicationContext);
  console.log("rerendered");
  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant={itemsView === "wide" ? "contained" : "outlined"}
        size="small"
        onClick={() => handleSetItemsView("wide")}
      >
        <ViewStreamIcon fontSize="small" />
      </Button>
      <Button
        variant={itemsView === "normal" ? "contained" : "outlined"}
        size="small"
        onClick={() => handleSetItemsView("normal")}
      >
        <GridViewIcon fontSize="small" />
      </Button>
    </Stack>
  );
};

export default ItemsViewToggle;
