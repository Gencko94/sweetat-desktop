import { Button, ButtonGroup } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { memo } from 'react';

const LanguageToggle = () => {
  const { locale } = useRouter();
  return (
    <ButtonGroup>
      <Button size="small" variant={locale === 'ar' ? 'contained' : 'outlined'}>
        العربية
      </Button>
      <Button size="small" variant={locale === 'en' ? 'contained' : 'outlined'}>
        English
      </Button>
    </ButtonGroup>
  );
};

export default memo(LanguageToggle);
