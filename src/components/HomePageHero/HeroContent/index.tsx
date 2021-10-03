import { Box, styled } from '@mui/system';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const HeroContent = () => {
  return (
    <Wrapper>
      <Typography
        textAlign={{ lg: 'unset', xs: 'center' }}
        fontWeight="bold"
        variant="h3"
        component="h1"
      >
        Your favourite restaurants and takeaways, delivered to your door
      </Typography>
      <Box component={Paper} elevation={0} my={6} p={4}>
        <Typography
          textAlign={{ lg: 'unset', xs: 'center' }}
          fontWeight="medium"
          variant="subtitle1"
          mb={2}
        >
          Enter your address to find local restaurants
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, md: 3 }}
        >
          <TextField
            InputProps={{
              endAdornment: (
                <IconButton color="primary">
                  <MyLocationIcon />
                </IconButton>
              ),
            }}
            placeholder="Enter your address"
            size="small"
            fullWidth
          />
          <Button size="large" variant="contained">
            Search
          </Button>
        </Stack>
      </Box>
    </Wrapper>
  );
};

export default HeroContent;

const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    width: '50%',
    margin: theme.spacing(1, 0),
  },
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    margin: theme.spacing(3, 0),
  },
}));
