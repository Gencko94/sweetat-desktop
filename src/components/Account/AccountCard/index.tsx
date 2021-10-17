import { Card, CardContent, CardHeader } from '@mui/material';

interface IAccountCardProps {
  title: string;
}

const AccountCard: React.FC<IAccountCardProps> = ({ title, children }) => {
  return (
    <Card>
      <CardHeader
        sx={{ borderBottom: 1, borderColor: theme => theme.palette.divider }}
        titleTypographyProps={{
          sx: {
            fontWeight: 'medium',
          },
          variant: 'h5',
        }}
        title={title}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AccountCard;
