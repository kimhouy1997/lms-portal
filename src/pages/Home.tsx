import { useTranslation } from 'react-i18next';
import { Typography, Button, Box, Container, Grid, Paper, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { RocketLaunch, School, TrendingUp, Stars, People } from '@mui/icons-material';
import CourseCard from '../components/cards/CourseCard';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const featuredCourses = [
    {
      title: 'Full-Stack Web Development',
      instructor: 'Dr. Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      price: '$49.99',
      rating: 4.8,
      students: 1250,
      duration: '40h 30m',
      category: 'Development'
    },
    {
      title: 'UI/UX Design Masterclass',
      instructor: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1561070791-26c11d204a3d?auto=format&fit=crop&w=800&q=80',
      price: '$39.99',
      rating: 4.9,
      students: 850,
      duration: '25h 15m',
      category: 'Design'
    },
    {
      title: 'Digital Marketing Excellence',
      instructor: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      price: '$29.99',
      rating: 4.7,
      students: 2100,
      duration: '15h 45m',
      category: 'Business'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative', 
        pt: { xs: 8, md: 15 }, 
        pb: { xs: 8, md: 20 },
        overflow: 'hidden'
      }}>
        {/* Abstract Background Shapes */}
        <Box sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '40%',
          height: '60%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
          filter: 'blur(100px)',
          zIndex: 0
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <MotionTypography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    mb: 3,
                    background: `linear-gradient(135deg, #fff 0%, ${theme.palette.primary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t('hero.title')}
                </MotionTypography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 5, maxWidth: '600px', lineHeight: 1.6 }}>
                  {t('hero.description')}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<RocketLaunch />}
                    sx={{ py: 2, px: 4, borderRadius: 3, fontSize: '1.1rem' }}
                  >
                    {t('hero.cta_primary')}
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ py: 2, px: 4, borderRadius: 3, fontSize: '1.1rem' }}
                  >
                    {t('hero.cta_secondary')}
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                sx={{ position: 'relative' }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  sx={{
                    width: '100%',
                    borderRadius: 8,
                    boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
                {/* Floating Stats Card */}
                <Paper sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: -30,
                  p: 3,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                }}>
                  <Box sx={{ p: 1, bgcolor: 'primary.main', borderRadius: 2, color: 'white' }}>
                    <TrendingUp />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>10k+</Typography>
                    <Typography variant="body2" color="text.secondary">Active Learners</Typography>
                  </Box>
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Courses Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box sx={{ mb: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <MotionTypography 
              variant="h3" 
              sx={{ fontWeight: 700, mb: 2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('courses.title')}
            </MotionTypography>
            <Typography variant="h6" color="text.secondary">
              {t('courses.subtitle')}
            </Typography>
          </Box>
          <Button variant="text" size="large" sx={{ fontWeight: 600 }}>
            {t('courses.view_all')} →
          </Button>
        </Box>

        <Grid container spacing={4}>
          {featuredCourses.map((course, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard {...course} />
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Promotion Section */}
      <Box sx={{ py: 15, bgcolor: 'rgba(100, 108, 255, 0.05)' }}>
        <Container maxWidth="lg">
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 8 }, 
              borderRadius: 8, 
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative Stars */}
            <Stars sx={{ position: 'absolute', top: 20, right: 20, fontSize: 100, opacity: 0.1, color: 'white' }} />
            
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h2" color="white" sx={{ mb: 2, fontWeight: 800 }}>
                    {t('promo.title')}
                  </Typography>
                  <Typography variant="h5" color="rgba(255,255,255,0.8)" sx={{ mb: 4 }}>
                    {t('promo.description')}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="inherit" 
                    size="large"
                    sx={{ 
                      color: 'primary.main', 
                      bgcolor: 'white',
                      px: 6,
                      py: 1.5,
                      fontWeight: 700,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      }
                    }}
                  >
                    {t('promo.cta')}
                  </Button>
                </MotionBox>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Typography variant="h1" color="white" sx={{ fontWeight: 900, fontSize: '6rem' }}>
                    50%
                  </Typography>
                  <Typography variant="h4" color="white" sx={{ fontWeight: 700, mt: -2 }}>
                    OFF
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Trust Badges / Stats Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={8} justifyContent="center">
          {[
            { icon: <School sx={{ fontSize: 40 }} />, count: '500+', label: 'Expert Instructors' },
            { icon: <Stars sx={{ fontSize: 40 }} />, count: '4.9/5', label: 'Average Rating' },
            { icon: <People sx={{ fontSize: 40 }} />, count: '100k+', label: 'Trusted Students' },
          ].map((stat, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index} sx={{ textAlign: 'center' }}>
              <MotionBox
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{stat.icon}</Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>{stat.count}</Typography>
                <Typography variant="body1" color="text.secondary">{stat.label}</Typography>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
