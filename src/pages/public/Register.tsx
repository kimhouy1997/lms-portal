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
  Grid,
  Divider
} from '@mui/material';
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  ArrowBack,
  Person,
  Badge,
  Google,
  MarkEmailRead,
  Login
} from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constant/routers';
import { useRegisterMutation } from '@root/src/redux/api/authApi';
import { showToast } from '@/utils/toast';
const registerSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const [registerApi, {isLoading, isSuccess}]= useRegisterMutation()

  const onSubmit = async (data: RegisterForm) => {
    return console.log(data);
    try {
      await registerApi(data).unwrap();
    } catch (error: any) {
      const messageError = error?.data?.message || 'Something went wrong';
      showToast.error(messageError);
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
        right: '10%',
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
        left: '10%',
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
                    <MarkEmailRead sx={{ fontSize: 50, color: 'success.main' }} />
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                    Registration Successful!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                    Thank you for signing up. If the email address you provided belongs to you, 
                    you will receive a verification email shortly. Please check your inbox and 
                    follow the instructions to activate your account.
                  </Typography>
                  
                  <Button
                    component={RouterLink}
                    to={`/${ROUTES.login}`}
                    variant="contained"
                    size="large"
                    startIcon={<Login />}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }}
                  >
                    Back to Login
                  </Button>
                </motion.div>
              </Box>
            ) : (
              <>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <IconButton 
                    component={RouterLink} 
                    to={ROUTES.home} 
                    sx={{ mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                  >
                    <ArrowBack color="primary" />
                  </IconButton>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Create Account
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Join our learning community today
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="First Name"
                          placeholder="John"
                          {...register('firstName')}
                          error={!!errors.firstName}
                          helperText={errors.firstName?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person sx={{ color: 'text.secondary' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          placeholder="Doe"
                          {...register('lastName')}
                          error={!!errors.lastName}
                          helperText={errors.lastName?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Badge sx={{ color: 'text.secondary' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                      </Grid>
                    </Grid>

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
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
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
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />

                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('confirmPassword')}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: 'text.secondary' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
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
                      {isLoading ? 'Creating account...' : 'Create Account'}
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
                      onClick={() => console.log('Google register')}
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
                      Sign up with Google
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                      Already have an account?{' '}
                      <Link 
                        component={RouterLink} 
                        to={`/${ROUTES.login}`}
                        sx={{ fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}
                      >
                        Sign in
                      </Link>
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

export default Register;

