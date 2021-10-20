import { FormControlLabel, RadioGroup, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/dist/client/router';
import { ADDON_CATEGORY } from '../../../lib/interfaces/IRestaurantItem';

import RadioButton from '../RadioButton';
interface IItemAddonsProps {
  addon_categories: ADDON_CATEGORY[];
}

const ItemAddons = ({ addon_categories }: IItemAddonsProps) => {
  const { locale } = useRouter();
  return (
    <Stack>
      {addon_categories.map(addonCategory => {
        return (
          <Box key={addonCategory.id}>
            <Typography
              gutterBottom
              variant="subtitle1"
              fontWeight="bold"
              color="primary"
            >
              {locale === 'ar' ? addonCategory.ar_name : addonCategory.name}
            </Typography>
            {addonCategory.type === 'SINGLE' && (
              <Stack component={RadioGroup} spacing={1}>
                {addonCategory.addons.map(addon => {
                  return (
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                      key={addon.id}
                      px={1}
                      sx={{
                        borderInlineStart: theme =>
                          `4px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      <FormControlLabel
                        value={addon.id}
                        sx={{ flex: 1, justifyContent: 'space-between' }}
                        label={
                          <Typography fontWeight="bold">
                            {locale === 'ar' ? addon.ar_name : addon.name} ( +
                            {addon.price} KD)
                          </Typography>
                        }
                        control={<RadioButton disableRipple color="default" />}
                        labelPlacement="start"
                      />
                    </Stack>
                  );
                })}
              </Stack>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};

export default ItemAddons;
