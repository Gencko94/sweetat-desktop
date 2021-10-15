import { Radio, RadioProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';
const RadioButton = forwardRef<any, RadioProps>(delegated => {
  return (
    <Radio checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...delegated} />
  );
});

export default RadioButton;
const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 22,
  height: 22,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.background.paper,
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: `2px auto ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark'
        ? 'rgba(57,75,89,.5)'
        : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,

  '&:before': {
    display: 'block',
    position: 'relative',
    transform: 'rotate(45deg)',
    width: 6,
    height: 12,
    left: 8,
    top: 4,
    borderBottom: '3px solid #fff',
    borderRight: '3px solid #fff',

    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
