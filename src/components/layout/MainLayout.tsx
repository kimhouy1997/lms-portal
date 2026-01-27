import { NavLink, Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constant/routers';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  useTheme,
  alpha,
  IconButton,
  Divider,
  Grid,
  Link,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import {
  Home,
  School,
  Info,
  Menu as MenuIcon,
  LightMode,
  DarkMode,
  Logout,
  Dashboard,
  Person,
  Settings
} from '@mui/icons-material';
import { useState } from 'react';
import MobileMenu from '@/components/layout/MobileMenu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setThemeMode } from '@/redux/slices/appSlice';
import { logout as logoutAction } from '@/redux/slices/authSlice';

const MainLayout = () => {
  const { t, i18n } = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.app.themeMode);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'kh' : 'en';
    i18n.changeLanguage(newLang);
    setSearchParams({ lng: newLang });
  };

  const toggleTheme = () => {
    dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light'));
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    handleProfileMenuClose();
    navigate('/');
  };

  const handleDashboard = () => {
    const role = user?.groups?.toLowerCase() || 'student';
    navigate(`/${role}/dashboard`);
    handleProfileMenuClose();
  };

  const navItems = [
    { label: t('nav.home'), path: '/', icon: <Home /> },
    { label: t('nav.courses'), path: '/courses', icon: <School /> },
    { label: t('nav.about'), path: '/about', icon: <Info /> },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={0} sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(5, 5, 5, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1100
      }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={4} alignItems="center">
              <Box component={NavLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
                <School sx={{ color: 'primary.main', fontSize: 32 }} />
                <Typography variant="h6" sx={{
                  fontWeight: 800,
                  background: `linear-gradient(to right, ${theme.palette.mode === 'dark' ? '#fff' : '#000'}, ${theme.palette.primary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px'
                }}>
                  LMS Portal
                </Typography>
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={NavLink}
                    to={item.path}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      px: 2,
                      '&.active': { color: 'primary.main' },
                      '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: 'text.primary',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 3,
                  p: 1,
                  display: { xs: 'none', sm: 'flex' }
                }}
              >
                {themeMode === 'light' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
              </IconButton>

              <Button
                variant="outlined"
                size="medium"
                startIcon={<LanguageIcon />}
                onClick={toggleLanguage}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  borderRadius: '10px',
                  borderColor: alpha(theme.palette.divider, 0.1),
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                {t('switch_language')}
              </Button>

              {isAuthenticated ? (
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      size="small"
                      sx={{ ml: 1 }}
                      aria-controls={anchorEl ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={anchorEl ? 'true' : undefined}
                    >
                      <Avatar
                        sx={{
                          width: 38,
                          height: 38,
                          bgcolor: 'primary.main',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                      >
                        {user?.username?.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                    onClick={handleProfileMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                        mt: 1.5,
                        borderRadius: 3,
                        minWidth: 200,
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {user?.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user?.groups}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleDashboard}>
                      <ListItemIcon><Dashboard fontSize="small" /></ListItemIcon>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                      <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                      <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                      Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  component={NavLink}
                  to={`/${ROUTES.login}`}
                  sx={{
                    borderRadius: '10px',
                    fontWeight: 700,
                    px: 3,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Sign In
                </Button>
              )}

              <IconButton
                onClick={() => setIsMobileMenuOpen(true)}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: 'text.primary',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        onToggleLanguage={toggleLanguage}
        languageLabel={t('switch_language')}
      />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{
        pt: 10,
        pb: 4,
        bgcolor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ mb: 8 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <School sx={{ color: 'primary.main', fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>LMS Portal</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 300 }}>
                {t('footer.description')}
              </Typography>
              <Stack direction="row" spacing={1}>
                {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map((Icon, i) => (
                  <IconButton key={i} size="small" sx={{
                    color: 'text.secondary',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '&:hover': { color: 'primary.main', bgcolor: 'rgba(100,108,255,0.1)' }
                  }}>
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            {[
              { title: t('footer.links'), items: [t('nav.home'), t('nav.courses'), t('nav.about'), 'Contact', 'FAQ'] },
              { title: 'Categories', items: ['Web Development', 'UI/UX Design', 'Digital Marketing', 'Mobile Apps', 'Cyber Security'] },
              { title: t('footer.contact'), items: ['info@lmsportal.com', '+855 12 345 678', 'Phnom Penh, Cambodia'] },
            ].map((section, i) => (
              <Grid size={{ xs: 6, md: 2.6 }} key={i}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
                  {section.title}
                </Typography>
                <Stack spacing={2}>
                  {section.items.map((item, j) => (
                    <Link key={j} href="#" underline="none" sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                      fontSize: '0.95rem'
                    }}>
                      {item}
                    </Link>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              © 2026 LMS Portal. {t('footer.rights')}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Link href="#" color="text.secondary" variant="body2" underline="none">Privacy Policy</Link>
              <Link href="#" color="text.secondary" variant="body2" underline="none">Terms of Service</Link>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
