import { useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    Tooltip,
    useTheme,
    alpha,
    useMediaQuery,
    Stack,
    Badge
} from '@mui/material';
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    Dashboard as DashboardIcon,
    School as CourseIcon,
    Settings as SettingsIcon,
    Person as ProfileIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
    Business as InstituteIcon,
    Class as ClassIcon,
    Assignment as ManagementIcon,
    LightMode,
    DarkMode,
    Language as LanguageIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setThemeMode } from '@/redux/slices/appSlice';
import { useLogoutMutation, useGetMeQuery } from '@/redux/api/authApi';

const drawerWidth = 280;
const collapsedDrawerWidth = 88;

interface NavItem {
    title: string;
    path: string;
    icon: ReactNode;
    role?: string[];
}

interface DashboardLayoutProps {
    role: 'student' | 'teacher' | 'admin' | 'assistant';
}

const DashboardLayout = ({ role }: DashboardLayoutProps) => {
    const { i18n } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector((state) => state.app.themeMode);
    const { data: user } = useGetMeQuery();
    const [logout] = useLogoutMutation();

    const [open, setOpen] = useState(!isMobile);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const toggleTheme = () => {
        dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light'));
    };

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('en') ? 'kh' : 'en';
        i18n.changeLanguage(newLang);
    };

    const getNavItems = (): NavItem[] => {
        const common = [
            { title: 'Profile', path: `/${role}/profile`, icon: <ProfileIcon /> },
            { title: 'Settings', path: `/${role}/settings`, icon: <SettingsIcon /> },
        ];

        switch (role) {
            case 'student':
                return [
                    { title: 'Dashboard', path: '/student/dashboard', icon: <DashboardIcon /> },
                    { title: 'Course List', path: '/student/courses', icon: <CourseIcon /> },
                    { title: 'Enrolled Courses', path: '/student/enrolled', icon: <ClassIcon /> },
                    ...common
                ];
            case 'teacher':
                return [
                    { title: 'Dashboard', path: '/teacher/dashboard', icon: <DashboardIcon /> },
                    { title: 'Course Management', path: '/teacher/courses', icon: <ManagementIcon /> },
                    { title: 'Class Management', path: '/teacher/classes', icon: <ClassIcon /> },
                    ...common
                ];
            case 'admin':
                return [
                    { title: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
                    { title: 'Course Management', path: '/admin/courses', icon: <ManagementIcon /> },
                    { title: 'Institutes', path: '/admin/institutes', icon: <InstituteIcon /> },
                    ...common
                ];
            default:
                return common;
        }
    };

    const navItems = getNavItems();

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: open ? 'space-between' : 'center',
                minHeight: 80
            }}>
                {open && (
                    <Typography variant="h6" sx={{
                        fontWeight: 800,
                        color: 'primary.main',
                        letterSpacing: '-0.5px'
                    }}>
                        LMS PORTAL
                    </Typography>
                )}
                <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.secondary' }}>
                    {open ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </Box>

            <Divider sx={{ opacity: 0.5 }} />

            <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.title} disablePadding sx={{ display: 'block', mb: 1 }}>
                            <Tooltip title={!open ? item.title : ""} placement="right">
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        borderRadius: 2,
                                        color: isActive ? 'primary.main' : 'text.secondary',
                                        bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                            color: 'primary.main',
                                            '& .MuiListItemIcon-root': { color: 'primary.main' }
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: isActive ? 'primary.main' : 'inherit',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText
                                            primary={item.title}
                                            primaryTypographyProps={{
                                                fontWeight: isActive ? 700 : 500,
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 2 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 3,
                        display: open ? 'block' : 'none'
                    }}
                >
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                        Logged in as
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {role.toUpperCase()}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(open && !isMobile && {
                        marginLeft: drawerWidth,
                        width: `calc(100% - ${drawerWidth}px)`,
                    }),
                    ...(!open && !isMobile && {
                        marginLeft: collapsedDrawerWidth,
                        width: `calc(100% - ${collapsedDrawerWidth}px)`,
                    }),
                    bgcolor: alpha(theme.palette.background.default, 0.8),
                    backdropFilter: 'blur(12px)',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    color: 'text.primary'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
                            {navItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton onClick={toggleLanguage} size="small">
                            <LanguageIcon fontSize="small" />
                        </IconButton>

                        <IconButton onClick={toggleTheme} size="small">
                            {themeMode === 'light' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
                        </IconButton>

                        <IconButton size="small">
                            <Badge badgeContent={4} color="error" variant="dot">
                                <NotificationsIcon fontSize="small" />
                            </Badge>
                        </IconButton>

                        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, my: 'auto' }} />

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
                                        width: 32,
                                        height: 32,
                                        bgcolor: 'primary.main',
                                        fontSize: '0.875rem',
                                        fontWeight: 600
                                    }}
                                    src={user?.avatar}
                                >
                                    {user?.firstName?.charAt(0) || role.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={open}
                onClose={handleDrawerToggle}
                sx={{
                    width: open ? drawerWidth : collapsedDrawerWidth,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidth : collapsedDrawerWidth,
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        overflowX: 'hidden',
                        borderRight: `1px solid ${theme.palette.divider}`,
                        bgcolor: 'background.default',
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    width: { sm: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)` },
                    mt: 8,
                    minHeight: '100vh',
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Outlet />
            </Box>

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
                        borderRadius: 2,
                        minWidth: 180,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
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
                <MenuItem onClick={() => navigate(`/${role}/profile`)}>
                    <ListItemIcon>
                        <ProfileIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => navigate(`/${role}/settings`)}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

const Paper = (props: any) => <Box {...props} />;

export default DashboardLayout;
