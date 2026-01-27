import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Stack,
  alpha,
  useTheme,
  Divider,
  Button,
  Avatar
} from '@mui/material';
import {
  Close,
  School,
  Login,
  Language,
  Logout,
  Dashboard,
  Person
} from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constant/routers';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout as logoutAction } from '@/redux/slices/authSlice';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; path: string; icon: React.ReactNode }[];
  onToggleLanguage: () => void;
  languageLabel: string;
}

const MobileMenu = ({ isOpen, onClose, navItems, onToggleLanguage, languageLabel }: MobileMenuProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
    onClose();
    navigate('/');
  };

  const handleDashboard = () => {
    const role = user?.groups?.toLowerCase() || 'student';
    navigate(`/${role}/dashboard`);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 320,
          bgcolor: 'background.default',
          backgroundImage: 'none',
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <School sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>LMS Portal</Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
              <Close />
            </IconButton>
          </Stack>
        </Box>

        <Divider sx={{ opacity: 0.5 }} />

        {/* User Profile Section (if logged in) */}
        {isAuthenticated && (
          <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: 'primary.main',
                  fontWeight: 700,
                  fontSize: '1.2rem'
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ overflow: 'hidden' }}>
                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
                  {user?.username}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {user?.groups}
                </Typography>
              </Box>
            </Stack>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<Dashboard />}
              onClick={handleDashboard}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            >
              Go to Dashboard
            </Button>
          </Box>
        )}

        <List sx={{ flexGrow: 1, p: 2 }}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={onClose}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    color: 'text.secondary',
                    '&.active': {
                      color: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '1rem' }}
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}

          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={onClose}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    color: 'text.secondary',
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary="My Profile"
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '1rem' }}
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          )}
        </List>

        <Box sx={{ p: 3, mt: 'auto' }}>
          <Stack spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Language />}
              onClick={() => {
                onToggleLanguage();
                onClose();
              }}
              sx={{
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                color: 'text.primary',
                borderColor: alpha(theme.palette.divider, 0.2)
              }}
            >
              {languageLabel}
            </Button>

            {isAuthenticated ? (
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: 700,
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: 'error.main',
                  '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) },
                  boxShadow: 'none'
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                component={NavLink}
                to={`/${ROUTES.login}`}
                onClick={onClose}
                startIcon={<Login />}
                sx={{ py: 1.2, borderRadius: 2, fontWeight: 700 }}
              >
                Sign In
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
