import { FormControlLabel, Typography, Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Controller, useFormContext } from 'react-hook-form';
import { ADDON, ADDON_CATEGORY } from '../../../lib/interfaces/IRestaurantItem';
import Checkbox from '../Checkbox';
import { IItemForm } from '../SingleItemDialog/SingleItemDialogContent';

interface IMultiItemAddonsProps {
  addonCategory: ADDON_CATEGORY;
}

const MultiItemAddons = ({ addonCategory }: IMultiItemAddonsProps) => {
  const { control, watch, setValue } = useFormContext<IItemForm>();
  const watchedAddons = watch('selectedaddons');
  const { locale } = useRouter();

  const handleCheckValue = (addon: ADDON) => {
    // ✨ here we have a Multi option addon category,
    // this means we can have more than one option per addon category,
    // we're using the addonCategory.id as a reference for manipulating the values.

    // ♦ Were checking here if this category addon and the value is already present in the form,
    // ♦ aka we selected previously an option from this categoryAddon.
    const foundIndex = watchedAddons.findIndex(a => {
      if (a.id === addonCategory.id && a.addon_id === addon.id) {
        return true;
      }
      return false;
    });
    // if it's already there (We have selected an existing option from this categoryAddon before) ..
    if (foundIndex !== -1) {
      // remove the check,
      // ⚡ Remember: We're on the Multi option (Checkboxes..).
      const copiedArray = [...watchedAddons];
      copiedArray.splice(foundIndex, 1);
      setValue('selectedaddons', copiedArray);
    } else {
      // if we haven't yet selected an option..
      // create an object with the categoryAddon.id and the option...
      setValue('selectedaddons', [
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
    <Box key={addonCategory.id}>
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
        render={({ field: { value } }) => {
          return (
            <Stack spacing={1}>
              {addonCategory.addons.map(addon => {
                const isSelected = Boolean(
                  value.find(
                    i => i.id === addonCategory.id && i.addon_id === addon.id
                  )
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
                      sx={{ flex: 1, justifyContent: 'space-between' }}
                      label={
                        <Typography fontWeight={isSelected ? 'bold' : 'medium'}>
                          {locale === 'ar' ? addon.ar_name : addon.name} ( +
                          {addon.price} KD)
                        </Typography>
                      }
                      control={
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleCheckValue(addon)}
                          disableRipple
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

export default MultiItemAddons;
