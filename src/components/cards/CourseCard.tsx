import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { AccessTime, People } from '@mui/icons-material';
import type { CourseCardProps } from '@/types/course.type';

const MotionCard = motion(Card);

const CourseCard = ({ title, instructor, image, price, rating, students, duration, category, isNew, isBestseller }: CourseCardProps) => {
  return (
    <MotionCard
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 12px 40px rgba(100, 108, 255, 0.2)',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
        />
        <Chip
          label={category}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 600,
          }}
        />
        {(isNew || isBestseller) && (
          <Chip
            label={isBestseller ? "Bestseller" : "New"}
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: isBestseller ? '#ff9800' : '#4caf50',
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, minHeight: '3.5rem' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          by {instructor}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
          <Rating value={rating} readOnly size="small" precision={0.5} />
          <Typography variant="body2" color="text.secondary">
            ({rating})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{duration}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <People sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{students} students</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
            {price}
          </Typography>
          <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
            Enroll Now
          </Button>
        </Box>
      </CardContent>
    </MotionCard>
  );
};

export default CourseCard;
