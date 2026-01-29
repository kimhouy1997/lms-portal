import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  InputAdornment,
  alpha,
  useTheme
} from '@mui/material';
import {
  Email,
  MarkEmailRead
} from '@mui/icons-material';
import Logo from '@/components/common/Logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constant/routers';
import { useForgotPasswordMutation } from '@/redux/api/authApi';
import { showToast } from '@/utils/toast';
import { useTranslation } from 'react-i18next';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgotPassword(data).unwrap();
    } catch (error: any) {
      console.error('Forgot password error:', error);
      const errorMessage = error?.data?.detail || error?.data?.message || 'Something went wrong. Please try again.';
      showToast.error(errorMessage);
    }
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
            {isSuccess ? (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      mx: 'auto'
                    }}
                  >
                    <MarkEmailRead sx={{ fontSize: 40, color: 'success.main' }} />
                  </Box>
                </motion.div>

                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                  {t('auth.forgot_password.success_title')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  {t('auth.forgot_password.success_desc')}
                </Typography>

                <Button
                  component={RouterLink}
                  to={`/${ROUTES.login}`}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  {t('auth.register.back_to_login')}
                </Button>
              </Box>
            ) : (
              <>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Logo sx={{ mb: 3 }} fontSize="2rem" iconSize={40} />
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    {t('auth.login.forgot_password')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t('auth.forgot_password.subtitle')}
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label={t('auth.login.email')}
                      placeholder="hello@example.com"
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: 'text.secondary' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: 3 }
                      }}
                    />

                    <Button
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        fontSize: '1rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`
                      }}
                    >
                      {isLoading ? t('contact_form.submitting') : t('auth.forgot_password.send_link')}
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                      {t('auth.forgot_password.remember_password')}{' '}
                      <Typography
                        component={RouterLink}
                        to={`/${ROUTES.login}`}
                        sx={{
                          fontWeight: 700,
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {t('auth.login.sign_in')}
                      </Typography>
                    </Typography>
                  </Stack>
                </form>
              </>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};