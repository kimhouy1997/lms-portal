import { Button, Paper, Stack, Typography, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface PricingCardProps {
  price: string;
  discountPrice: string;
  onEnroll?: () => void;
}

const MotionPaper = motion(Paper);

const PricingCard = ({ price, discountPrice, onEnroll }: PricingCardProps) => {
  const theme = useTheme();

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      sx={{ 
        p: 6, 
        textAlign: 'center', 
        borderRadius: 8, 
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
      }}
    >
      <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        Investment in your career
      </Typography>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={4}>
        <Typography variant="h2" sx={{ fontWeight: 900 }}>
          {discountPrice}
        </Typography>
        <Typography variant="h4" sx={{ 
          color: 'text.secondary', 
          textDecoration: 'line-through',
          opacity: 0.5 
        }}>
          {price}
        </Typography>
      </Stack>
      <Button 
        variant="contained" 
        fullWidth 
        size="large"
        onClick={onEnroll}
        sx={{ 
          py: 2, 
          borderRadius: 4, 
          fontSize: '1.2rem', 
          fontWeight: 800,
          boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.4)}`
        }}
      >
        Enroll in Course
      </Button>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        30-Day Money Back Guarantee • Lifetime Access
      </Typography>
    </MotionPaper>
  );
};

export default PricingCard;
