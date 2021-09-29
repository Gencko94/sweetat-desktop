import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface IShopStatusProps {
  is_active: 0 | 1;
  accept_preorder: 0 | 1;
}

const ShopStatus = ({ accept_preorder, is_active }: IShopStatusProps) => {
  const { t } = useTranslation();
  const shopStatusColor = useMemo(() => {
    if (is_active === 1) {
      return "success";
    }
    if (is_active === 0 && accept_preorder === 1) {
      return "primary";
    }
    return "error";
  }, [accept_preorder, is_active]);
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Dot color={shopStatusColor} />
      <Typography variant="body2" fontWeight="medium">
        {is_active === 1
          ? t`open`
          : accept_preorder === 1
          ? t`pre-orders`
          : t`closed`}
      </Typography>
    </Stack>
  );
};

export default ShopStatus;
const Dot = styled("span")<{ color: string }>(({ theme, color }) => ({
  height: "10px",
  width: "10px",
  borderRadius: "50%",
  backgroundColor: theme.palette[color].main,
  display: "inline",
}));
