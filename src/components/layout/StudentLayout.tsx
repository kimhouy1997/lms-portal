import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constant/routers';
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
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Tooltip,
    Badge
} from '@mui/material';
import {
    School,
    Dashboard,
    Person,
    Settings,
    Logout,
    Notifications,
    Search,
    Book
} from '@mui/icons-material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout as logoutAction } from '@/redux/slices/authSlice';

const StudentLayout = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

    const navItems = [
        { label: 'Dashboard', path: '/student/dashboard', icon: <Dashboard /> },
        { label: 'My Courses', path: '/student/courses', icon: <Book /> },
        { label: 'Browse', path: '/courses', icon: <Search /> },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="sticky" elevation={0} sx={{
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${theme.palette.divider}`,
                zIndex: 1100,
                color: 'text.primary'
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 70 }}>
                        {/* Left Score: Logo & Main Nav */}
                        <Stack direction="row" spacing={4} alignItems="center">
                            <Box component={NavLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
                                <School sx={{ color: 'primary.main', fontSize: 32 }} />
                                <Typography variant="h6" sx={{
                                    fontWeight: 800,
                                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitFillColor: 'transparent',
                                    display: { xs: 'none', sm: 'block' }
                                }}>
                                    STUDENT HUB
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {navItems.map((item) => (
                                    <Button
                                        key={item.label}
                                        component={NavLink}
                                        to={item.path}
                                        startIcon={item.icon}
                                        sx={{
                                            color: 'text.secondary',
                                            fontWeight: 600,
                                            px: 2,
                                            borderRadius: 2,
                                            '&.active': {
                                                color: 'primary.main',
                                                bgcolor: alpha(theme.palette.primary.main, 0.08)
                                            },
                                            '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.04) }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Stack>
                        </Stack>

                        {/* Right Side: Actions & Profile */}
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <IconButton size="small">
                                <Badge badgeContent={3} color="primary">
                                    <Notifications fontSize="small" />
                                </Badge>
                            </IconButton>

                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleProfileMenuOpen}
                                    size="small"
                                    sx={{
                                        p: 0.5,
                                        border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                        transition: '0.2s',
                                        '&:hover': { borderColor: 'primary.main' }
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            bgcolor: 'primary.main',
                                            fontWeight: 700,
                                            fontSize: '0.8rem'
                                        }}
                                        src={user?.avatar}
                                    >
                                        {user?.username?.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>

            {/* Account Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.1))',
                        mt: 1.5,
                        borderRadius: 3,
                        minWidth: 220,
                        p: 1,
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
                <Box sx={{ px: 2, py: 1.5, mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {user?.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Student Account
                    </Typography>
                </Box>
                <MenuItem onClick={() => { navigate(ROUTES.student.profile); handleProfileMenuClose(); }} sx={{ borderRadius: 2 }}>
                    <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                    My Profile
                </MenuItem>
                <MenuItem onClick={() => { navigate(ROUTES.student.settings); handleProfileMenuClose(); }} sx={{ borderRadius: 2 }}>
                    <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                    Settings
                </MenuItem>
                <Box sx={{ my: 1 }}>
                    <Box sx={{ height: 1, bgcolor: 'divider' }} />
                </Box>
                <MenuItem onClick={handleLogout} sx={{ borderRadius: 2, color: 'error.main' }}>
                    <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default StudentLayout;
