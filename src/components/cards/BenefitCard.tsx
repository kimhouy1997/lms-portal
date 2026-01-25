import { Paper, Typography, alpha, useTheme } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface BenefitCardProps {
  benefit: string;
}

const MotionPaper = motion(Paper);

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  const theme = useTheme();

  return (
    <MotionPaper
      whileHover={{ y: -5 }}
      sx={{ 
        p: 4, 
        height: '100%', 
        borderRadius: 4, 
        bgcolor: alpha(theme.palette.background.paper, 0.5),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        '&:hover': {
          borderColor: 'primary.main',
        }
      }}
    >
      <CheckCircle sx={{ color: 'primary.main', mb: 2, fontSize: 32 }} />
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {benefit}
      </Typography>
    </MotionPaper>
  );
};

export default BenefitCard;
