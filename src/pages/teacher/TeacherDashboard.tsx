import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    IconButton,
    LinearProgress,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    alpha,
    useTheme,
    Chip,
    Paper
} from '@mui/material';
import {
    Add,
    School,
    People,
    Assignment,
    Schedule,
    ChevronRight,
    AssignmentLate,
    GroupAdd,
    PlayCircleOutline
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const TeacherDashboard = () => {
    const theme = useTheme();

    // Mock Data
    const stats = [
        { label: 'My Classes', value: '12', icon: <School />, color: 'primary' },
        { label: 'Total Students', value: '458', icon: <People />, color: 'info' },
        { label: 'Pending Assignments', value: '24', icon: <AssignmentLate />, color: 'warning' },
        { label: 'Classes Today', value: '4', icon: <Schedule />, color: 'success' },
    ];

    const myClasses = [
        {
            id: 1,
            name: 'Advanced UX Design & Interaction',
            class: 'Batch A - 2026',
            progress: 65,
            students: 42,
            image: 'https://images.unsplash.com/photo-1541462608141-ad60397d446a?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 2,
            name: 'Frontend Development with React',
            class: 'Batch B - 2026',
            progress: 40,
            students: 38,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 3,
            name: 'Digital Marketing Essentials',
            class: 'Batch C - 2026',
            progress: 85,
            students: 56,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400'
        }
    ];

    const pendingTasks = [
        { id: 1, type: 'assignment', title: 'Review Assignment 4: Portfolio Drafts', deadline: 'Today, 5:00 PM', count: 12 },
        { id: 2, type: 'approval', title: 'Student Enrollment Approvals', deadline: '24 Jan 2026', count: 5 },
        { id: 3, type: 'quiz', title: 'Grade Quiz 1: UX Fundamentals', deadline: 'Tomorrow', count: 18 },
    ];

    const recentActivity = [
        { id: 1, user: 'John Doe', action: 'submitted', target: 'Assignment 2', time: '10m ago' },
        { id: 2, user: 'Sarah Smith', action: 'completed', target: 'Lesson 4: Wireframing', time: '25m ago' },
        { id: 3, user: 'Mike Johnson', action: 'enrolled', target: 'UX Design Course', time: '1h ago' },
        { id: 4, user: 'Elena Ross', action: 'submitted', target: 'Quiz 2', time: '2h ago' },
    ];

    return (
        <Box sx={{ pb: 6 }}>
            {/* 1. Page Header */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -1, mb: 0.5 }}>
                        Teacher Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Welcome back, Professor! Here's what's happening today.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        sx={{ borderRadius: 3, px: 3, fontWeight: 700, height: 48, boxShadow: theme.shadows[4] }}
                    >
                        Create Lesson
                    </Button>
                </Stack>
            </Box>

            {/* 2. Overview Stats (KPI Cards) */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                {stats.map((stat, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <MotionCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            sx={{
                                borderRadius: 5,
                                bgcolor: 'background.paper',
                                border: `1px solid ${theme.palette.divider}`,
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows[8] }
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: 4,
                                        bgcolor: alpha(theme.palette[stat.color as 'primary' | 'info' | 'warning' | 'success'].main, 0.1),
                                        color: `${stat.color}.main`,
                                        display: 'flex'
                                    }}>
                                        {stat.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                            {stat.label}
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 900 }}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4}>
                {/* 3. My Classes (Main Section) */}
                <Grid size={{ xs: 12, xl: 8 }}>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>My Classes</Typography>
                        <Button endIcon={<ChevronRight />} sx={{ fontWeight: 700 }}>See All</Button>
                    </Box>
                    <Grid container spacing={3}>
                        {myClasses.map((course, index) => (
                            <Grid key={course.id} size={{ xs: 12, md: 6 }}>
                                <MotionCard
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    sx={{
                                        borderRadius: 5,
                                        overflow: 'hidden',
                                        bgcolor: 'background.paper',
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                >
                                    <Box sx={{ height: 140, position: 'relative' }}>
                                        <Box
                                            component="img"
                                            src={course.image}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0, bottom: 0,
                                            bgcolor: 'rgba(0,0,0,0.4)',
                                            p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                                        }}>
                                            <Chip
                                                label={course.class}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(255,255,255,0.2)',
                                                    backdropFilter: 'blur(4px)',
                                                    color: 'white',
                                                    fontWeight: 700,
                                                    width: 'fit-content',
                                                    mb: 1
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, height: 50, overflow: 'hidden' }}>
                                            {course.name}
                                        </Typography>
                                        <Box sx={{ mb: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Student Completion</Typography>
                                                <Typography variant="body2" color="primary" sx={{ fontWeight: 800 }}>{course.progress}%</Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={course.progress}
                                                sx={{ height: 6, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                                            />
                                        </Box>
                                        <Stack direction="row" spacing={1}>
                                            <Button fullWidth variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>View</Button>
                                            <Button fullWidth variant="outlined" sx={{ borderRadius: 2, fontWeight: 700 }}>Lessons</Button>
                                        </Stack>
                                    </CardContent>
                                </MotionCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* 4. Recent Activity / Tasks */}
                <Grid size={{ xs: 12, xl: 4 }}>
                    <Stack spacing={4}>
                        {/* Pending Tasks */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Pending Tasks</Typography>
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 5,
                                    p: 1,
                                    border: `1px solid ${theme.palette.divider}`,
                                    bgcolor: alpha(theme.palette.background.paper, 0.4),
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <List disablePadding>
                                    {pendingTasks.map((task, index) => (
                                        <Box key={task.id}>
                                            <ListItem
                                                secondaryAction={
                                                    <IconButton size="small"><ChevronRight /></IconButton>
                                                }
                                                sx={{ py: 2, px: 2 }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{
                                                        bgcolor: alpha(theme.palette[task.type === 'assignment' ? 'warning' : task.type === 'approval' ? 'info' : 'primary'].main, 0.1),
                                                        color: task.type === 'assignment' ? 'warning.main' : task.type === 'approval' ? 'info.main' : 'primary.main'
                                                    }}>
                                                        {task.type === 'assignment' ? <Assignment /> : task.type === 'approval' ? <GroupAdd /> : <PlayCircleOutline />}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={task.title}
                                                    secondary={`Deadline: ${task.deadline}`}
                                                    primaryTypographyProps={{ fontWeight: 700, fontSize: '0.95rem' }}
                                                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                                                />
                                                <Box sx={{ ml: 2, textAlign: 'right', minWidth: 40 }}>
                                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 900 }}>{task.count}</Typography>
                                                </Box>
                                            </ListItem>
                                            {index < pendingTasks.length - 1 && <Divider sx={{ mx: 2, opacity: 0.5 }} />}
                                        </Box>
                                    ))}
                                </List>
                            </Paper>
                        </Box>

                        {/* Recent Activity */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Recent Activity</Typography>
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 5,
                                    p: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                    bgcolor: alpha(theme.palette.background.paper, 0.4),
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <List disablePadding>
                                    {recentActivity.map((activity, index) => (
                                        <Box key={activity.id}>
                                            <ListItem alignItems="flex-start" sx={{ px: 1, py: 1.5 }}>
                                                <ListItemAvatar sx={{ minWidth: 48 }}>
                                                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', fontWeight: 800 }}>
                                                        {activity.user.charAt(0)}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                            {activity.user} <Box component="span" sx={{ fontWeight: 400, color: 'text.secondary' }}>{activity.action}</Box> {activity.target}
                                                        </Typography>
                                                    }
                                                    secondary={activity.time}
                                                    secondaryTypographyProps={{ fontSize: '0.75rem' }}
                                                />
                                            </ListItem>
                                            {index < recentActivity.length - 1 && <Divider variant="inset" component="li" sx={{ opacity: 0.3 }} />}
                                        </Box>
                                    ))}
                                </List>
                                <Button fullWidth sx={{ mt: 1, fontWeight: 700, borderRadius: 2 }}>View All Activity</Button>
                            </Paper>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TeacherDashboard;