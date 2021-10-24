import {
  FormControlLabel,
  Typography,
  Box,
  Stack,
  RadioGroup,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ADDON, ADDON_CATEGORY } from '../../../lib/interfaces/IRestaurantItem';
import RadioButton from '../RadioButton';
import { IItemForm } from '../SingleItemDialog/SingleItemDialogContent';

interface ISingleItemAddonsProps {
  addonCategory: ADDON_CATEGORY;
}

const SingleItemAddons = ({ addonCategory }: ISingleItemAddonsProps) => {
  const { control, watch } = useFormContext<IItemForm>();
  const watchedAddons = watch('selectedaddons');
  const { locale } = useRouter();
  const handleCheckValue = (addon: ADDON, onChange: (..._: any[]) => void) => {
    // ✨ here we have a single option addon category,
    // and we can't have more than one option per addon category,
    // we're using the addonCategory.id as a reference for replacing the value

    // ♦ Were checking here if this category addon is already present in the form,
    // ♦ aka we selected previously an option from this categoryAddon.
    const foundIndex = watchedAddons.findIndex(a => {
      if (a.id === addonCategory.id) {
        return true;
      }
      return false;
    });
    // if it's already there (We have selected an option from this categoryAddon before) ..
    if (foundIndex !== -1) {
      // replace the old value with the new value,
      // ⚡ Remember: We're on the SINGLE option (Radio buttons).
      const copiedArray = [...watchedAddons];
      copiedArray.splice(foundIndex, 1, {
        addon_category_name: addon.name,
        addon_category_ar_name: addon.ar_name,
        addon_id: addon.id,
        id: addonCategory.id,
      });
      onChange(copiedArray);
    } else {
      // if we haven't yet selected an option..
      // create an object with the categoryAddon.id and the option...
      onChange([
        ...watchedAddons,
        {
          addon_category_name: addon.name,
          addon_category_ar_name: addon.ar_name,
          addon_id: addon.id,
          id: addonCategory.id,
        },
      ]);
    }
  };
  return (
    <Box>
      <Typography
        gutterBottom
        variant="subtitle1"
        fontWeight="bold"
        color="primary"
      >
        {locale === 'ar' ? addonCategory.ar_name : addonCategory.name}
      </Typography>
      <Controller
        control={control}
        name="selectedaddons"
        render={({ field: { onChange, value } }) => {
          return (
            <Stack
              component={RadioGroup}
              value={value.find(i => i.id === addonCategory.id)?.addon_id}
              onChange={(_: ChangeEvent<HTMLInputElement>, value: string) => {
                const selectedAddon = addonCategory.addons.find(
                  i => i.id === +value
                );
                if (selectedAddon) {
                  handleCheckValue(selectedAddon, onChange);
                }
              }}
              spacing={1}
            >
              {addonCategory.addons.map(addon => {
                const isSelected = Boolean(
                  value.find(i => i.id === addonCategory.id)?.addon_id ===
                    addon.id
                );
                return (
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                    key={addon.id}
                    px={1}
                    sx={{
                      borderInlineStart: theme =>
                        isSelected
                          ? `4px solid ${theme.palette.primary.main}`
                          : '',
                    }}
                  >
                    <FormControlLabel
                      value={addon.id}
                      sx={{ flex: 1, justifyContent: 'space-between' }}
                      label={
                        <Typography fontWeight={isSelected ? 'bold' : 'medium'}>
                          {locale === 'ar' ? addon.ar_name : addon.name} ( +
                          {addon.price} KD)
                        </Typography>
                      }
                      control={
                        <RadioButton
                          value={addon.id}
                          onChange={() => handleCheckValue(addon, onChange)}
                          disableRipple
                          color="default"
                        />
                      }
                      labelPlacement="start"
                    />
                  </Stack>
                );
              })}
            </Stack>
          );
        }}
      />
    </Box>
  );
};

export default SingleItemAddons;
