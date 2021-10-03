import { Container } from '@mui/material';
import { Box, styled } from '@mui/system';
import HomePageNavbar from '../HomepageNavbar';
import HeroContent from './HeroContent';
const HomePageHero = () => {
  return (
    <Wrapper>
      <Container sx={{ maxWidth: { xl: 'xl', lg: 'lg', md: 'md' } }}>
        <HomePageNavbar />
        <Box>
          <HeroContent />
        </Box>
      </Container>
    </Wrapper>
  );
};

export default HomePageHero;

const Wrapper = styled(Box)(({ theme }) => ({
  backgroundImage: `${
    theme.direction === 'rtl'
      ? 'url("assets/desktop-cover-ar.jpg")'
      : 'url("assets/desktop-cover-en.jpg")'
  }`,
  height: '100vh',
  width: '100vw',
  backgroundSize: 'cover',
  [theme.breakpoints.down('md')]: {
    backgroundPosition: 'bottom',
  },
  [theme.breakpoints.up('md')]: {
    backgroundPosition: 'center',
  },
}));
