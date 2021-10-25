import { InputAdornment, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useApplicationState } from '../../contexts/ApplicationContext';

const SearchBar = () => {
  const { t } = useTranslation();

  const [state, setState] = useApplicationState();
  return (
    <TextField
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      placeholder={t`search-input-placeholder`}
      size="small"
      sx={{ flex: 1 }}
      fullWidth
      value={state.globalSearchValue}
      onChange={e =>
        setState(prev => ({
          ...prev,
          globalSearchValue: e.target.value,
        }))
      }
    />
  );
};

export default SearchBar;
