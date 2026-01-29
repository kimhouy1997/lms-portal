import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    Grid2 as Grid,
    Card,
    Button,
    Stack,
    Avatar,
    Chip,
    useTheme,
    alpha,
    LinearProgress,
    IconButton,
    Tabs,
    Tab,
    Menu,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    School,
    People,
    CalendarToday,
    ArrowForward,
    MoreVert,
    Add,
    Edit,
    Archive,
    Unarchive,
    Delete,
    Visibility
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constant/routers';

const MotionCard = motion(Card);

// Types
export interface TeacherClassItem {
    id: number;
    name: string;
    course: string;
    students: number;
    nextClass: string;
    progress: number;
    color: string;
    type: string;
    status: string;
}

// Mock Data for Classes
const classesData: TeacherClassItem[] = [
    {
        id: 1,
        name: 'Batch A - Web development',
        course: 'Advanced React & Next.js',
        students: 24,
        nextClass: 'Today, 2:00 PM',
        progress: 65,
        color: '#3f51b5',
        type: 'On-site',
        status: 'active'
    },
    {
        id: 2,
        name: 'Evening Group - UI/UX',
        course: 'Interaction Design',
        students: 18,
        nextClass: 'Tomorrow, 10:00 AM',
        progress: 42,
        color: '#f44336',
        type: 'Online',
        status: 'active'
    },
    {
        id: 3,
        name: 'Fast Track - Fullstack',
        course: 'MERN Stack Bootcamp',
        students: 30,
        nextClass: 'Mon, 9:00 AM',
        progress: 88,
        color: '#4caf50',
        type: 'On-site',
        status: 'active'
    },
    {
        id: 4,
        name: 'Weekend Special - Mobile',
        course: 'React Native Advanced',
        students: 12,
        nextClass: 'Sat, 1:00 PM',
        progress: 15,
        color: '#ff9800',
        type: 'Online',
        status: 'active'
    },
    {
        id: 5,
        name: 'Q3 Batch - Python for AI',
        course: 'Artificial Intelligence',
        students: 20,
        nextClass: 'Completed',
        progress: 100,
        color: '#673ab7',
        type: 'On-site',
        status: 'archived'
    },
    {
        id: 6,
        name: 'Spring 2025 - Data Science',
        course: 'Data Science Fundamentals',
        students: 15,
        nextClass: 'Completed',
        progress: 100,
        color: '#009688',
        type: 'Online',
        status: 'archived'
    }
];

const TeacherClass = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [tabValue, setTabValue] = useState(0); // 0: Active, 1: Archived
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedClass, setSelectedClass] = useState<TeacherClassItem | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, classItem: TeacherClassItem) => {
        setAnchorEl(event.currentTarget);
        setSelectedClass(classItem);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedClass(null);
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleViewDetail = (id: number) => {
        navigate(`/${ROUTES.teacher.index}/${ROUTES.teacher.classes}/${id}`);
    };

    const activeClasses = classesData.filter(item => item.status === 'active');
    const archivedClasses = classesData.filter(item => item.status === 'archived');

    const filteredClasses = tabValue === 0 ? activeClasses : archivedClasses;

    return (
        <Box sx={{ pb: 6 }}>
            {/* Header Area */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1.5, mb: 1 }}>
                        {t('teacher.classes.title')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, opacity: 0.8 }}>
                        {t('teacher.classes.manage_desc', { count: filteredClasses.length })}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{
                        borderRadius: 3.5,
                        px: 4,
                        py: 1.5,
                        fontWeight: 800,
                        height: 54,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 25px ${alpha(theme.palette.primary.main, 0.4)}` }
                    }}
                >
                    {t('teacher.classes.create_new')}
                </Button>
            </Box>

            {/* Tabs */}
            <Box sx={{ mb: 4, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        '& .MuiTab-root': {
                            fontWeight: 800,
                            fontSize: '1rem',
                            textTransform: 'none',
                            minHeight: 48,
                            px: 3
                        }
                    }}
                >
                    <Tab
                        label={
                            <Stack direction="row" spacing={1} alignItems="center">
                                <span>{t('teacher.classes.active')}</span>
                                <Chip
                                    label={activeClasses.length}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        minWidth: 24,
                                        fontWeight: 900,
                                        fontSize: '0.7rem',
                                        bgcolor: tabValue === 0 ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.divider, 0.5),
                                        color: tabValue === 0 ? 'primary.main' : 'text.secondary',
                                        transition: '0.2s',
                                        '& .MuiChip-label': { px: 0.8 }
                                    }}
                                />
                            </Stack>
                        }
                    />
                    <Tab
                        label={
                            <Stack direction="row" spacing={1} alignItems="center">
                                <span>{t('teacher.classes.archived')}</span>
                                <Chip
                                    label={archivedClasses.length}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        minWidth: 24,
                                        fontWeight: 900,
                                        fontSize: '0.7rem',
                                        bgcolor: tabValue === 1 ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.divider, 0.5),
                                        color: tabValue === 1 ? 'primary.main' : 'text.secondary',
                                        transition: '0.2s',
                                        '& .MuiChip-label': { px: 0.8 }
                                    }}
                                />
                            </Stack>
                        }
                    />
                </Tabs>
            </Box>

            {/* Grid of Classes */}
            <Grid container spacing={4}>
                {filteredClasses.map((item, index) => (
                    <Grid size={{ xs: 12, md: 6, xl: 4 }} key={item.id}>
                        <MotionCard
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            sx={{
                                borderRadius: 6,
                                overflow: 'hidden',
                                border: `1px solid ${theme.palette.divider}`,
                                bgcolor: 'background.paper',
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.08)}`,
                                    transform: 'translateY(-8px)',
                                    borderColor: alpha(item.color, 0.3)
                                }
                            }}
                        >
                            <Box sx={{ p: 3, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: 4,
                                        bgcolor: alpha(item.color, 0.1),
                                        color: item.color,
                                        display: 'flex'
                                    }}>
                                        <School fontSize="medium" />
                                    </Box>
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        <Chip
                                            label={item.type === 'Online' ? t('teacher.classes.online') : t('teacher.classes.on_site')}
                                            size="small"
                                            sx={{
                                                fontWeight: 800,
                                                borderRadius: 1.5,
                                                bgcolor: item.type === 'Online' ? alpha(theme.palette.info.main, 0.1) : alpha(theme.palette.success.main, 0.1),
                                                color: item.type === 'Online' ? 'info.main' : 'success.main',
                                                border: 'none'
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleMenuOpen(e, item)}
                                            sx={{
                                                bgcolor: anchorEl && selectedClass?.id === item.id ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                                color: anchorEl && selectedClass?.id === item.id ? 'primary.main' : 'text.secondary'
                                            }}
                                        >
                                            <MoreVert fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </Stack>

                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: -0.5 }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 3 }}>
                                    {t('teacher.classes.target')} {item.course}
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <People sx={{ color: 'text.secondary', fontSize: 18 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                {item.students} {t('teacher.classes.students')}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CalendarToday sx={{ color: 'text.secondary', fontSize: 18 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                {item.status === 'active' ? item.nextClass.split(',')[0] : t('teacher.classes.archived')}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ p: 3, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                                <Box sx={{ mb: 3 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>
                                            {t('teacher.classes.progress')}
                                        </Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 900, color: item.color }}>
                                            {item.progress}%
                                        </Typography>
                                    </Stack>
                                    <LinearProgress
                                        variant="determinate"
                                        value={item.progress}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: alpha(item.color, 0.1),
                                            '& .MuiLinearProgress-bar': {
                                                bgcolor: item.color,
                                                borderRadius: 4
                                            }
                                        }}
                                    />
                                </Box>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Stack direction="row" spacing={-1}>
                                        {[1, 2, 3].map((i) => (
                                            <Avatar
                                                key={i}
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    border: `2px solid ${theme.palette.background.paper}`,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700
                                                }}
                                            />
                                        ))}
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                border: `2px solid ${theme.palette.background.paper}`,
                                                fontSize: '0.65rem',
                                                fontWeight: 800,
                                                bgcolor: theme.palette.divider,
                                                color: 'text.secondary'
                                            }}
                                        >
                                            +{item.students - 3}
                                        </Avatar>
                                    </Stack>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Button
                                        variant="text"
                                        color="primary"
                                        endIcon={<ArrowForward />}
                                        onClick={() => handleViewDetail(item.id)}
                                        sx={{ fontWeight: 800, textTransform: 'none' }}
                                    >
                                        {t('teacher.classes.manage')}
                                    </Button>
                                </Stack>
                            </Box>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        mt: 1,
                        minWidth: 180,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        '& .MuiMenuItem-root': {
                            px: 2,
                            py: 1.2,
                            borderRadius: 1.5,
                            mx: 0.5,
                            my: 0.2,
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                color: theme.palette.primary.main,
                                '& .MuiListItemIcon-root': { color: theme.palette.primary.main }
                            }
                        }
                    }
                }}
            >
                <MenuItem onClick={() => {
                    if (selectedClass) handleViewDetail(selectedClass.id);
                    handleMenuClose();
                }}>
                    <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
                    <ListItemText primary={t('teacher.classes.view_detail', { defaultValue: 'View Details' })} primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
                    <ListItemText primary={t('common.edit', { defaultValue: 'Edit Class' })} primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
                <Divider sx={{ my: 1, opacity: 0.5 }} />
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        {selectedClass?.status === 'active' ? <Archive fontSize="small" /> : <Unarchive fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText
                        primary={selectedClass?.status === 'active' ? t('common.archive', { defaultValue: 'Archive' }) : t('common.unarchive', { defaultValue: 'Unarchive' })}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    />
                </MenuItem>
                <MenuItem
                    onClick={handleMenuClose}
                    sx={{ color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.05) + ' !important' } }}
                >
                    <ListItemIcon><Delete fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
                    <ListItemText primary={t('common.delete', { defaultValue: 'Delete Class' })} primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default TeacherClass;