import { Box, Button, Container, Typography, useTheme, alpha } from '@mui/material';
import { LockPerson, Home } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constant/routers';

export const Forbidden = () => {
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
              bgcolor: alpha(theme.palette.error.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
              mx: 'auto'
            }}
          >
            <LockPerson sx={{ fontSize: 64, color: 'error.main' }} />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Access Denied
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
            You don't have permission to access this page.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 400, mx: 'auto' }}>
            It looks like you've tried to access a page that requires different privileges. 
            Please contact your administrator if you believe this is a mistake.
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
            Back to Home
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};