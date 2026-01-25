import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Chip, 
  alpha, 
  useTheme 
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionTypography = motion(Typography);

interface CourseHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
}

const CourseHero = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  categories 
}: CourseHeroProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      bgcolor: 'background.paper', 
      pt: { xs: 10, md: 15 }, 
      pb: { xs: 8, md: 10 },
      borderBottom: `1px solid ${theme.palette.divider}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '40%',
        height: '60%',
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <MotionTypography 
            variant="h2" 
            sx={{ fontWeight: 900, mb: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Our Courses
          </MotionTypography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
            Master new skills with our professional curriculum designed by industry experts.
          </Typography>

          <Box sx={{ width: '100%', maxWidth: 700 }}>
            <TextField
              fullWidth
              placeholder="Search for titles, skills, or instructors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoComplete="off"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  bgcolor: 'background.default',
                  fontSize: '1.1rem',
                  pr: 1
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => onSearchChange('')} size="small">
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap gap={1} justifyContent="center">
            {categories.slice(0, 5).map(cat => (
              <Chip 
                key={cat} 
                label={cat} 
                variant="outlined"
                onClick={() => onCategoryChange(cat)}
                sx={{ 
                  cursor: 'pointer',
                  bgcolor: selectedCategory === cat ? 'primary.main' : 'transparent',
                  color: selectedCategory === cat ? 'white' : 'inherit',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CourseHero;
