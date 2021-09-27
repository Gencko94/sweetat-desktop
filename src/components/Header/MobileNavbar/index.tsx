import { IconButton, Stack } from "@mui/material";
import DeliverTo from "../../DeliverTo";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
const MobileNavbar = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <DeliverTo />
      <Stack direction="row" spacing={1}>
        <IconButton>
          <LocalMallIcon fontSize="medium" />
        </IconButton>
        <IconButton>
          <PersonIcon fontSize="medium" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default MobileNavbar;
