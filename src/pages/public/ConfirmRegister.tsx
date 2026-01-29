import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  alpha,
  useTheme,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  VerifiedUser,
  ErrorOutline,
  ArrowForward,
  Login
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constant/routers';
import { useConfirmRegisterMutation } from '@root/src/redux/api/authApi';
import { useTranslation } from 'react-i18next';

const ConfirmRegister = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [confirmEmail, { isLoading, isSuccess, isError, error }] = useConfirmRegisterMutation();
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    if (uid && token && !hasRequested) {
      setHasRequested(true);
      confirmEmail({ uid, token });
    }
  }, [uid, token, confirmEmail, hasRequested]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress size={60} thickness={4} sx={{ mb: 4 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {t('auth.confirm.verifying')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('auth.confirm.verifying_desc')}
          </Typography>
        </Box>
      );
    }

    if (isSuccess) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.success.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                mx: 'auto'
              }}
            >
              <VerifiedUser sx={{ fontSize: 50, color: 'success.main' }} />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
              {t('auth.confirm.success_title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              {t('auth.confirm.success_desc')}
            </Typography>

            <Button
              component={RouterLink}
              to={`/${ROUTES.login}`}
              variant="contained"
              size="large"
              startIcon={<Login />}
              sx={{
                borderRadius: 3,
                px: 6,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`
              }}
            >
              {t('auth.register.back_to_login')}
            </Button>
          </motion.div>
        </Box>
      );
    }

    if (isError) {
      const errorMessage = (error as any)?.data?.error || (error as any)?.data?.message || t('auth.confirm.failed_desc');

      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.error.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                mx: 'auto'
              }}
            >
              <ErrorOutline sx={{ fontSize: 50, color: 'error.main' }} />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
              {t('auth.confirm.failed_title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              {errorMessage}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                component={RouterLink}
                to={`/${ROUTES.register}`}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                }}
              >
                {t('auth.confirm.register_again')}
              </Button>
              <Button
                component={RouterLink}
                to={`/${ROUTES.login}`}
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                }}
              >
                {t('auth.confirm.go_to_login')}
              </Button>
            </Stack>
          </motion.div>
        </Box>
      );
    }

    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          {t('auth.confirm.invalid_request')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('auth.confirm.no_token')}
        </Typography>
        <Button
          component={RouterLink}
          to={ROUTES.home}
          variant="contained"
          startIcon={<ArrowForward />}
          sx={{ borderRadius: 3 }}
        >
          {t('nav.home')}
        </Button>
      </Box>
    );
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      py: 10
    }}>
      {/* Background Orbs */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: alpha(theme.palette.primary.main, 0.1),
        filter: 'blur(100px)',
        borderRadius: '50%',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: alpha(theme.palette.secondary.main, 0.1),
        filter: 'blur(120px)',
        borderRadius: '50%',
        zIndex: 0
      }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 6,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
          >
            {renderContent()}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ConfirmRegister;