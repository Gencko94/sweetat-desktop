import { Button, ButtonGroup } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  COLOR_MODES,
  useApplicationState,
} from '../../contexts/ApplicationContext';

const ColorModeToggle = () => {
  const { t } = useTranslation();
  const [state, setState] = useApplicationState();

  const handleToggleColorMode = (mode: COLOR_MODES) => {
    setState(prev => ({
      ...prev,
      colorMode: mode,
    }));
  };
  return (
    <ButtonGroup>
      <Button
        size="small"
        onClick={() => handleToggleColorMode('light')}
        variant={state.colorMode === 'light' ? 'contained' : 'outlined'}
      >{t`light`}</Button>
      <Button
        size="small"
        onClick={() => handleToggleColorMode('dark')}
        variant={state.colorMode === 'dark' ? 'contained' : 'outlined'}
      >{t`dark`}</Button>
    </ButtonGroup>
  );
};

export default memo(ColorModeToggle);
