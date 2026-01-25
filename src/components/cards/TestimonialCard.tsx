import { Divider, Paper, Rating, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
}

const MotionPaper = motion(Paper);

const TestimonialCard = ({ name, role, text }: TestimonialCardProps) => {
  return (
    <MotionPaper sx={{ p: 4, borderRadius: 4, height: '100%', bgcolor: 'background.paper' }}>
      <Rating value={5} readOnly size="small" sx={{ mb: 2 }} />
      <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>"{text}"</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{name}</Typography>
      <Typography variant="caption" color="text.secondary">{role}</Typography>
    </MotionPaper>
  );
};

export default TestimonialCard;
