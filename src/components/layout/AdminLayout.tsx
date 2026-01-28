import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    useTheme,
    alpha,
    Stack,
    Badge,
    ListSubheader
} from '@mui/material';
import {
    Dashboard,
    Business,
    People,
    AdminPanelSettings,
    History,
    Person,
    Settings,
    Logout,
    Notifications,
    Security,
    Search,
    School
} from '@mui/icons-material';
import { DarkMode, LightMode, Language as LanguageIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout as logoutAction } from '@/redux/slices/authSlice';
import { setThemeMode } from '@/redux/slices/appSlice';
import { useTranslation } from 'react-i18next';

const drawerWidth = 280;

const AdminLayout = () => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();
    const { user } = useAppSelector((state) => state.auth);
    const { themeMode } = useAppSelector((state) => state.app);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        dispatch(logoutAction());
        handleMenuClose();
        navigate('/login');
    };

    const toggleTheme = () => dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light'));
    const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'kh' : 'en');

    const menuSections = [
        {
            subheader: 'SYSTEM',
            items: [
                { title: 'Dashboard', path: '/admin/dashboard', icon: <Dashboard /> },
                { title: 'Institutes', path: '/admin/institutes', icon: <Business /> },
                { title: 'Courses', path: '/admin/courses', icon: <School /> },
            ]
        },
        {
            subheader: 'MANAGEMENT',
            items: [
                { title: 'Users', path: '/admin/users', icon: <People /> },
                { title: 'Roles & Permissions', path: '/admin/permissions', icon: <Security /> },
                { title: 'System Logs', path: '/admin/logs', icon: <History /> },
            ]
        }
    ];

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'grey.900', color: 'common.white' }}>
            <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <AdminPanelSettings sx={{ color: 'primary.main', fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                    ADMIN CONSOLE
                </Typography>
            </Box>

            <List
                sx={{ px: 2, flexGrow: 1 }}
                subheader={<Box sx={{ px: 2, py: 1 }} />}
            >
                {menuSections.map((section) => (
                    <Box key={section.subheader} sx={{ mb: 2 }}>
                        <ListSubheader sx={{
                            bgcolor: 'transparent',
                            color: 'grey.500',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            letterSpacing: 1.2,
                            mb: 1
                        }}>
                            {section.subheader}
                        </ListSubheader>
                        {section.items.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton
                                        component={NavLink}
                                        to={item.path}
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.2,
                                            color: isActive ? 'primary.main' : 'grey.400',
                                            bgcolor: isActive ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                            '&:hover': {
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: '0.875rem' }} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </Box>
                ))}
            </List>

            <Divider sx={{ bgcolor: 'grey.800', mx: 2 }} />

            <Box sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                    <IconButton size="small" onClick={toggleTheme} sx={{ color: 'grey.400', bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.700' } }}>
                        {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                    </IconButton>
                    <IconButton size="small" onClick={toggleLanguage} sx={{ color: 'grey.400', bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.700' } }}>
                        <LanguageIcon fontSize="small" />
                    </IconButton>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2, bgcolor: 'grey.800', borderRadius: 3 }}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                        {user?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>{user?.username}</Typography>
                        <Typography variant="caption" sx={{ color: 'grey.500' }}>Super Admin</Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    color: 'text.primary'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: alpha(theme.palette.divider, 0.05),
                            px: 2,
                            py: 0.8,
                            borderRadius: 2,
                            width: '100%',
                            maxWidth: 400
                        }}>
                            <Search fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Search for something...</Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                            <IconButton size="small" onClick={toggleTheme} sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
                                {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                            </IconButton>
                        </Box>
                        <IconButton><Badge badgeContent={8} color="error"><Notifications /></Badge></IconButton>
                        <IconButton onClick={handleMenuOpen} size="small">
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                {user?.username?.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        border: 'none'
                    },
                }}
                open
            >
                {drawer}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 6,
                    mt: 8,
                    minHeight: '100vh',
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Outlet />
            </Box>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => navigate('/admin/profile')}><ListItemIcon><Person fontSize="small" /></ListItemIcon>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/admin/settings')}><ListItemIcon><Settings fontSize="small" /></ListItemIcon>Settings</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}><ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default AdminLayout;
