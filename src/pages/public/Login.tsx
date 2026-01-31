import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Link,
  IconButton,
  InputAdornment,
  alpha,
  useTheme,
  Divider
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google
} from '@mui/icons-material';
import Logo from '@/components/common/Logo';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constant/routers';
import { useLoginMutation } from '@/redux/api/authApi';
import { showToast } from '@/utils/toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { useTranslation } from 'react-i18next';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password must be at least 1 character'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.groups?.toLowerCase() || 'student';
      navigate(`/${role}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login({
        username: data.email,
        password: data.password
      }).unwrap();

      dispatch(setCredentials(response));
      showToast.success('Login successful! Welcome back.');
      const role = response.groups?.toLowerCase() || 'student';
      navigate(`/${role}`);
    } catch (error: any) {
      const errorMessage = error?.data?.detail || error?.data?.message || 'Login failed. Please check your credentials.';
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
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Logo sx={{ mb: 3 }} fontSize="2rem" iconSize={40} />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                {t('auth.login.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('auth.login.subtitle')}
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

                <TextField
                  fullWidth
                  label={t('auth.login.password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': { borderRadius: 3 }
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link
                    component={RouterLink}
                    to={`/${ROUTES.forgotPassword}`}
                    variant="body2"
                    sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none' }}
                  >
                    {t('auth.login.forgot_password')}
                  </Link>
                </Box>

                <Button
                  loading={isLoading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`
                  }}
                >
                  {isSubmitting ? t('auth.login.signing_in') : t('auth.login.sign_in')}
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                  <Divider sx={{ flex: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                    {t('auth.login.or')}
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>

                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => console.log('Google login')}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderColor: alpha(theme.palette.divider, 0.2),
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                >
                  {t('auth.login.google_login')}
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                  {t('auth.login.no_account')}{' '}
                  <Link
                    component={RouterLink}
                    to={`/${ROUTES.register}`}
                    sx={{ fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}
                  >
                    {t('auth.login.sign_up')}
                  </Link>
                </Typography>
              </Stack>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;
