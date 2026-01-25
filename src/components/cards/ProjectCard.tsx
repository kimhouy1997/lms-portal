import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  desc: string;
  image: string;
}

const MotionPaper = motion(Paper);

const ProjectCard = ({ title, desc, image }: ProjectCardProps) => {
  return (
    <MotionPaper
      whileHover={{ y: -10 }}
      sx={{ borderRadius: 4, overflow: 'hidden', height: '100%', bgcolor: 'background.paper' }}
    >
      <Box component="img" src={image} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{desc}</Typography>
      </Box>
    </MotionPaper>
  );
};

export default ProjectCard;
