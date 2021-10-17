import { InputLabelProps, Typography } from '@mui/material';
import { forwardRef } from 'react';

const Label = forwardRef<any, InputLabelProps>(({ children }, ref) => {
  return (
    <Typography
      component="label"
      sx={{ display: 'block' }}
      gutterBottom
      variant="subtitle2"
      ref={ref}
    >
      {children}
    </Typography>
  );
});

export default Label;
