import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Card,
    Button,
    Stack,
    Avatar,
    Chip,
    useTheme,
    alpha,
    LinearProgress,
    IconButton
} from '@mui/material';
import {
    School,
    People,
    CalendarToday,
    ArrowForward,
    MoreVert,
    Add
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constant/routers';

const MotionCard = motion(Card);

// Mock Data for Classes
const classesData = [
    {
        id: 1,
        name: 'Batch A - Web development',
        course: 'Advanced React & Next.js',
        students: 24,
        nextClass: 'Today, 2:00 PM',
        progress: 65,
        color: '#3f51b5',
        type: 'On-site'
    },
    {
        id: 2,
        name: 'Evening Group - UI/UX',
        course: 'Interaction Design',
        students: 18,
        nextClass: 'Tomorrow, 10:00 AM',
        progress: 42,
        color: '#f44336',
        type: 'Online'
    },
    {
        id: 3,
        name: 'Fast Track - Fullstack',
        course: 'MERN Stack Bootcamp',
        students: 30,
        nextClass: 'Mon, 9:00 AM',
        progress: 88,
        color: '#4caf50',
        type: 'On-site'
    },
    {
        id: 4,
        name: 'Weekend Special - Mobile',
        course: 'React Native Advanced',
        students: 12,
        nextClass: 'Sat, 1:00 PM',
        progress: 15,
        color: '#ff9800',
        type: 'Online'
    }
];

const TeacherClass = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleViewDetail = (id: number) => {
        navigate(`/${ROUTES.teacher.index}/${ROUTES.teacher.classes}/${id}`);
    };

    return (
        <Box sx={{ pb: 6 }}>
            {/* Header Area */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1.5, mb: 1 }}>
                        My Classes
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, opacity: 0.8 }}>
                        Managing {classesData.length} active classes and tracking student engagement.
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
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }}
                >
                    Create New Class
                </Button>
            </Box>

            {/* Grid of Classes */}
            <Grid container spacing={4}>
                {classesData.map((item, index) => (
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
                                    <Stack direction="row" spacing={0.5}>
                                        <Chip
                                            label={item.type}
                                            size="small"
                                            sx={{
                                                fontWeight: 800,
                                                borderRadius: 1.5,
                                                bgcolor: item.type === 'Online' ? alpha(theme.palette.info.main, 0.1) : alpha(theme.palette.success.main, 0.1),
                                                color: item.type === 'Online' ? 'info.main' : 'success.main',
                                                border: 'none'
                                            }}
                                        />
                                        <IconButton size="small">
                                            <MoreVert fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </Stack>

                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: -0.5 }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 3 }}>
                                    Target: {item.course}
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <People sx={{ color: 'text.secondary', fontSize: 18 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                {item.students} Students
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CalendarToday sx={{ color: 'text.secondary', fontSize: 18 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                {item.nextClass.split(',')[0]}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ p: 3, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                                <Box sx={{ mb: 3 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>
                                            Syllabus Progress
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
                                        Manage
                                    </Button>
                                </Stack>
                            </Box>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TeacherClass;