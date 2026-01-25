import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
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
  IconButton,
  Divider,
  Grid,
  Link
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { School } from '@mui/icons-material';

const MainLayout = () => {
  const { t, i18n } = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const theme = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'kh' : 'en';
    i18n.changeLanguage(newLang);
    setSearchParams({ lng: newLang });
  };

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.courses'), path: '/courses' },
    { label: t('nav.pricing'), path: '/pricing' },
    { label: t('nav.about'), path: '/about' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={0} sx={{ 
        backgroundColor: 'rgba(5, 5, 5, 0.8)', 
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
                  background: `linear-gradient(to right, #fff, ${theme.palette.primary.main})`,
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
              <Button 
                variant="outlined" 
                size="medium"
                startIcon={<LanguageIcon />}
                onClick={toggleLanguage}
                sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  borderRadius: '10px',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(100, 108, 255, 0.05)'
                  }
                }}
              >
                {t('switch_language')}
              </Button>
              <Button 
                variant="contained" 
                sx={{ 
                  borderRadius: '10px', 
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      
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
