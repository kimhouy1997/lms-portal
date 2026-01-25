import { Box, Button, Container, Typography, useTheme, alpha } from '@mui/material';
import { Home, SearchOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constant/routers';

export const NotFound = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 8
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
              mx: 'auto'
            }}
          >
            <SearchOff sx={{ fontSize: 64, color: 'warning.main' }} />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Typography variant="h1" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '4rem', md: '6rem' }, color: 'text.disabled', lineHeight: 1 }}>
            404
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 400, mx: 'auto' }}>
            Oops! The page you are looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </Typography>
          
          <Button
            component={Link}
            to={ROUTES.home}
            variant="contained"
            size="large"
            startIcon={<Home />}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`
            }}
          >
            Return Home
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};