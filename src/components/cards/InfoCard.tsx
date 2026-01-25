import { Box, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

interface InfoCardProps {
  title: string;
  desc: string;
}

const InfoCard = ({ title, desc }: InfoCardProps) => {
  return (
    <Box sx={{ 
      p: 4, 
      borderRadius: 4, 
      bgcolor: 'background.paper', 
      border: `1px solid rgba(255, 255, 255, 0.1)`, 
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: 'secondary.main',
        transform: 'translateY(-5px)'
      }
    }}>
      <Star sx={{ color: 'secondary.main', mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{desc}</Typography>
    </Box>
  );
};

export default InfoCard;
