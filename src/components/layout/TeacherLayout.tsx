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
    useMediaQuery,
    Stack
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard,
    School,
    Class,
    Assignment,
    Person,
    Settings,
    Logout,
    Notifications,
    People
} from '@mui/icons-material';
import { DarkMode, LightMode, Language as LanguageIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout as logoutAction } from '@/redux/slices/authSlice';
import { setThemeMode } from '@/redux/slices/appSlice';
import { useTranslation } from 'react-i18next';

const drawerWidth = 280;

const TeacherLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();
    const { user } = useAppSelector((state) => state.auth);
    const { themeMode } = useAppSelector((state) => state.app);

    const [open, setOpen] = useState(!isMobile);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => setOpen(!open);
    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        dispatch(logoutAction());
        handleMenuClose();
        navigate('/login');
    };

    const toggleTheme = () => dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light'));
    const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'kh' : 'en');

    const menuItems = [
        { title: 'Overview', path: '/teacher/dashboard', icon: <Dashboard /> },
        { title: 'My Courses', path: '/teacher/courses', icon: <School /> },
        { title: 'Classes', path: '/teacher/classes', icon: <Class /> },
        { title: 'Students', path: '/teacher/students', icon: <People /> },
        { title: 'Assignments', path: '/teacher/assignments', icon: <Assignment /> },
    ];

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: -1 }}>
                    TEACHER PANEL
                </Typography>
            </Box>

            <Divider sx={{ mx: 2, opacity: 0.5 }} />

            <List sx={{ px: 2, py: 4, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.title} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    borderRadius: 3,
                                    py: 1.5,
                                    color: isActive ? 'primary.main' : 'text.secondary',
                                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                                        color: 'primary.main'
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 45 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 2, mt: 'auto' }}>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                    <IconButton size="small" onClick={toggleTheme} sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
                        {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                    </IconButton>
                    <IconButton size="small" onClick={toggleLanguage} sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
                        <LanguageIcon fontSize="small" />
                    </IconButton>
                </Stack>
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 4 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                            {user?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ overflow: 'hidden' }}>
                            <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>{user?.username}</Typography>
                            <Typography variant="caption" color="text.secondary">Teacher</Typography>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
                    ml: { md: `${open ? drawerWidth : 0}px` },
                    bgcolor: alpha(theme.palette.background.default, 0.8),
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    color: 'text.primary',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: open ? 'none' : 'flex' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {menuItems.find(i => i.path === location.pathname)?.title || 'Dashboard'}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                            <IconButton size="small" onClick={toggleTheme} sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
                                {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                            </IconButton>
                        </Box>
                        <IconButton size="small"><Notifications fontSize="small" /></IconButton>
                        <IconButton onClick={handleMenuOpen} size="small">
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem' }}>
                                {user?.username?.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { md: open ? drawerWidth : 0 }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant={isMobile ? "temporary" : "persistent"}
                    open={open}
                    onClose={handleDrawerToggle}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            borderRight: `1px solid ${theme.palette.divider}`,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    mt: 8
                }}
            >
                <Outlet />
            </Box>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => navigate('/teacher/profile')}><ListItemIcon><Person fontSize="small" /></ListItemIcon>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/teacher/settings')}><ListItemIcon><Settings fontSize="small" /></ListItemIcon>Settings</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}><ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default TeacherLayout;
