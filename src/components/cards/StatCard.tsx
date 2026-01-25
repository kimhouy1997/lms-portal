import { Box, Typography } from '@mui/material';
import type { ReactElement } from 'react';

interface StatCardProps {
  icon: ReactElement;
  label: string;
  value: string;
}

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ 
        color: 'primary.main', 
        mb: 2, 
        display: 'flex', 
        justifyContent: 'center',
        '& svg': { fontSize: 28 }
      }}>
        {icon}
      </Box>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  );
};

export default StatCard;
