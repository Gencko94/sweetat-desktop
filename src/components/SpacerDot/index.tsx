import { styled } from "@mui/system";

const SpacerDot = () => {
  return <Dot />;
};

export default SpacerDot;
const Dot = styled("span")(({ theme }) => ({
  width: "7px",
  height: "7px",
  margin: "0 5px",
  borderRadius: "50%",
  backgroundColor: theme.palette.divider,
}));
