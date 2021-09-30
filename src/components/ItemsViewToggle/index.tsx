import GridViewIcon from "@mui/icons-material/GridView";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

import { Button, Stack } from "@mui/material";

import { useApplicationState } from "../../contexts/ApplicationContext";

const ItemsViewToggle = () => {
  const [state, setState] = useApplicationState();

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant={state.itemsView === "wide" ? "contained" : "outlined"}
        size="small"
        onClick={() =>
          setState((prev) => ({
            ...prev,
            itemsView: "wide",
          }))
        }
      >
        <ViewStreamIcon fontSize="small" />
      </Button>
      <Button
        variant={state.itemsView === "normal" ? "contained" : "outlined"}
        size="small"
        onClick={() =>
          setState((prev) => ({
            ...prev,
            itemsView: "normal",
          }))
        }
      >
        <GridViewIcon fontSize="small" />
      </Button>
    </Stack>
  );
};

export default ItemsViewToggle;
