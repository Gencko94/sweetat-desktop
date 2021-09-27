import { IconButton, Stack, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import { useTranslation } from "react-i18next";
const DeliverTo = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" display="flex" alignItems="center" spacing={1}>
      <Image
        src="/assets/kuwait.svg"
        alt="Kuwait flag"
        width={40}
        height={40}
      />
      <Stack spacing={0}>
        <Typography variant="subtitle2">{t("deliver-to")}</Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          Hawalli Governorate
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DeliverTo;
