import { styled } from '@mui/system';

export const DarkImageOverlay = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: '#fff',
  backgroundColor: `rgba(0,0,0,0.5)`,
}));
