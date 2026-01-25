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
  ArrowBack,
  Google
} from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constant/routers';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    // Simulate API call
    console.log('Login data:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate(ROUTES.home);
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
              <IconButton 
                component={RouterLink} 
                to={ROUTES.home} 
                sx={{ mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
              >
                <ArrowBack color="primary" />
              </IconButton>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please enter your details to sign in
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
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
                  label="Password"
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
                    to="#" 
                    variant="body2" 
                    sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
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
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                  <Divider sx={{ flex: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                    OR
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
                  Continue with Google
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                  Don't have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to={`/${ROUTES.register}`}
                    sx={{ fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}
                  >
                    Sign up
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
