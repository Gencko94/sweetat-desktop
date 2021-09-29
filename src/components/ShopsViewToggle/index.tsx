import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ComputerIcon from "@mui/icons-material/Computer";
import { Button, IconButton, Stack } from "@mui/material";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";

const ShopsViewToggle = () => {
  const { shopsView, handleSetShopsView } = useContext(ApplicationContext);
  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant={shopsView === "wide" ? "contained" : "outlined"}
        size="small"
        onClick={() => handleSetShopsView("wide")}
      >
        <ComputerIcon />
      </Button>
      <Button
        variant={shopsView === "normal" ? "contained" : "outlined"}
        size="small"
        onClick={() => handleSetShopsView("normal")}
      >
        <ViewStreamIcon />
      </Button>
    </Stack>
  );
};

export default ShopsViewToggle;
