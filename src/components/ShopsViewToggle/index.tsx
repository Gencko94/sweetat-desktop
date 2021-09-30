import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ComputerIcon from "@mui/icons-material/Computer";
import { Button, Stack } from "@mui/material";
import { useApplicationState } from "../../contexts/ApplicationContext";

const ShopsViewToggle = () => {
  const [state, setState] = useApplicationState();
  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant={state.shopsView === "wide" ? "contained" : "outlined"}
        size="small"
        onClick={() =>
          setState((prev) => ({
            ...prev,
            shopsView: "wide",
          }))
        }
      >
        <ComputerIcon />
      </Button>
      <Button
        variant={state.shopsView === "normal" ? "contained" : "outlined"}
        size="small"
        onClick={() =>
          setState((prev) => ({
            ...prev,
            shopsView: "normal",
          }))
        }
      >
        <ViewStreamIcon />
      </Button>
    </Stack>
  );
};

export default ShopsViewToggle;
