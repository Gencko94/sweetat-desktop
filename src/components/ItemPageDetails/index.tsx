import {
  Container,
  Fab,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { ITEM } from "../../../lib/interfaces/IRestaurantItem";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MessageIcon from "@mui/icons-material/Message";
import { useTranslation } from "react-i18next";

interface ItemPageDetailsProps {
  item: ITEM;
  handleAppendQuantity: () => void;
  handleSubstractQuantity: () => void;
  quantity: number;
}

const ItemPageDetails = ({
  item,
  handleAppendQuantity,
  handleSubstractQuantity,
  quantity,
}: ItemPageDetailsProps) => {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <Container component={Paper} sx={{ py: 2 }}>
      <Stack direction="row">
        <Typography variant="h5" fontWeight="bold">
          {locale === "ar" ? item.ar_name : item.name}
        </Typography>
      </Stack>
      <Typography variant="h6" fontWeight="medium" color="secondary">
        {item.price} KD
      </Typography>
      {item.ar_desc !== null && item.desc !== null && (
        <div
          dangerouslySetInnerHTML={{
            __html:
              locale === "ar" ? (item.ar_desc as any) : (item.desc as any),
          }}
        ></div>
      )}
      <Box>
        <Typography variant="h6" fontWeight="medium" color="primary">
          {t`quantity`} :
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={3}
        >
          <Fab
            onClick={() => handleAppendQuantity()}
            size="small"
            color="primary"
            aria-label="add"
          >
            <AddIcon fontSize="medium" />
          </Fab>
          <Typography variant="h6" fontWeight="medium" color="secondary">
            {quantity}
          </Typography>
          <Fab
            onClick={() => handleSubstractQuantity()}
            size="small"
            color="primary"
            aria-label="add"
          >
            <RemoveIcon fontSize="medium" />
          </Fab>
        </Stack>
      </Box>
      <br />
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
          mb={2}
        >
          <MessageIcon color="primary" />
          <Typography variant="h6" fontWeight="medium" color="primary">
            {t`special-request`} :
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color="text.secondary"
          >
            ({t`optional`})
          </Typography>
        </Stack>
        <TextField fullWidth rows={6} multiline></TextField>
      </Box>
    </Container>
  );
};

export default ItemPageDetails;
