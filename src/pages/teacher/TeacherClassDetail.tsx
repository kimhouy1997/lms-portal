import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    Avatar,
    Chip,
    useTheme,
    alpha,
    Tab,
    Tabs,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    IconButton,
    Paper,
    LinearProgress
} from '@mui/material';
import {
    ArrowBack,
    Group,
    LibraryBooks,
    Assignment,
    Chat,
    PlayArrow,
    MoreVert,
    CheckCircle,
    RadioButtonUnchecked,
    Download,
    Mail
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
            sx={{ py: 4 }}
        >
            {value === index && children}
        </Box>
    );
}

const TeacherClassDetail = () => {
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Mock Class Data (in a real app, you'd fetch this based on the ID)
    const classDetail = {
        id: id,
        name: 'Batch A - Web development',
        course: 'Advanced React & Next.js',
        students: 24,
        nextClass: 'Today, 2:00 PM',
        room: 'Lab 402',
        description: 'This class focuses on mastering modern web development using React and Next.js, covering topics from state management to server-side rendering.',
        instructor: 'Dr. Jane Smith',
        status: 'Active',
        progress: 65,
        totalLessons: 24,
        completedLessons: 16
    };

    // Mock Students
    const students = [
        { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', performance: 92, status: 'Present' },
        { id: 2, name: 'Bob Wilson', email: 'bob.w@example.com', performance: 78, status: 'Absent' },
        { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', performance: 85, status: 'Late' },
        { id: 4, name: 'David Miller', email: 'david.m@example.com', performance: 64, status: 'Present' },
    ];

    // Mock Lessons
    const lessons = [
        { id: 1, title: 'Introduction to Next.js 14', type: 'Lecture', date: 'Jan 15, 2026', completed: true },
        { id: 2, title: 'Server Components & Client Components', type: 'Lecture', date: 'Jan 18, 2026', completed: true },
        { id: 3, title: 'Advanced Routing Patterns', type: 'Workshop', date: 'Jan 22, 2026', completed: true },
        { id: 4, title: 'State Management with Redux Toolkit', type: 'Lecture', date: 'Today, 2:00 PM', completed: false },
        { id: 5, title: 'Project: Building a Saas Dashboard', type: 'Review', date: 'Jan 30, 2026', completed: false },
    ];

    return (
        <Box sx={{ pb: 6 }}>
            {/* Navigation & Actions */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/teacher/classes')}
                    sx={{ fontWeight: 700, borderRadius: 2 }}
                >
                    Back to Classes
                </Button>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<Chat />}
                        sx={{ fontWeight: 700, borderRadius: 2 }}
                    >
                        Announce
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<PlayArrow />}
                        sx={{ fontWeight: 700, borderRadius: 2.5, px: 3 }}
                    >
                        Start Session
                    </Button>
                </Stack>
            </Stack>

            {/* Class Hero Info */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 6,
                    mb: 4,
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 4
                }}
            >
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: 5,
                        boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`
                    }}
                >
                    <Group sx={{ fontSize: 50 }} />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <Chip label={classDetail.status} size="small" color="success" sx={{ fontWeight: 900, fontSize: '0.65rem' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            {classDetail.room} • Next: {classDetail.nextClass}
                        </Typography>
                    </Stack>
                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1, mb: 1 }}>
                        {classDetail.name}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {classDetail.course}
                    </Typography>
                </Box>
                <Box sx={{ minWidth: 200 }}>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>CLASS COMPLETION</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 900 }}>{classDetail.progress}%</Typography>
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={classDetail.progress}
                        sx={{ height: 10, borderRadius: 5, bgcolor: alpha(theme.palette.divider, 0.5) }}
                    />
                </Box>
            </Paper>

            {/* Content Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        '& .MuiTab-root': { fontWeight: 800, textTransform: 'none', fontSize: '1rem', px: 4 },
                        '& .Mui-selected': { color: 'primary.main' }
                    }}
                >
                    <Tab label="Curriculum" icon={<LibraryBooks sx={{ fontSize: 20 }} />} iconPosition="start" />
                    <Tab label="Students" icon={<Group sx={{ fontSize: 20 }} />} iconPosition="start" />
                    <Tab label="Assignments" icon={<Assignment sx={{ fontSize: 20 }} />} iconPosition="start" />
                </Tabs>
            </Box>

            {/* TAB PANELS */}

            {/* 1. Lessons/Curriculum */}
            <CustomTabPanel value={tabValue} index={0}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>Lesson Roadmap</Typography>
                        <Stack spacing={2}>
                            {lessons.map((lesson) => (
                                <MotionCard
                                    key={lesson.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    sx={{
                                        borderRadius: 4,
                                        border: `1px solid ${theme.palette.divider}`,
                                        bgcolor: lesson.completed ? alpha(theme.palette.success.main, 0.02) : 'background.paper',
                                        '&:hover': { boxShadow: theme.shadows[2] }
                                    }}
                                >
                                    <ListItem secondaryAction={
                                        <Stack direction="row" spacing={1}>
                                            <IconButton size="small"><Download fontSize="small" /></IconButton>
                                            <IconButton size="small"><MoreVert fontSize="small" /></IconButton>
                                        </Stack>
                                    }>
                                        <ListItemAvatar>
                                            <IconButton color={lesson.completed ? 'success' : 'default'}>
                                                {lesson.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography sx={{ fontWeight: 800 }}>{lesson.title}</Typography>}
                                            secondary={
                                                <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                                                    <Chip label={lesson.type} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>{lesson.date}</Typography>
                                                </Stack>
                                            }
                                        />
                                    </ListItem>
                                </MotionCard>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Card sx={{ borderRadius: 4, border: `1px solid ${theme.palette.divider}`, p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Resources</Typography>
                            <List>
                                {['Course Syllabus.pdf', 'Lab Setup Guide.md', 'Class Schedule.xlsx'].map((file, i) => (
                                    <ListItem key={i} sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                                                <LibraryBooks fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography variant="body2" fontWeight={700}>{file}</Typography>}
                                            secondary="Dec 12, 2025"
                                        />
                                        <IconButton size="small"><Download fontSize="small" /></IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Button fullWidth variant="outlined" sx={{ mt: 2, borderRadius: 2, fontWeight: 700 }}>
                                Add Resource
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </CustomTabPanel>

            {/* 2. Students Tab */}
            <CustomTabPanel value={tabValue} index={1}>
                <Paper sx={{ borderRadius: 6, border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }}>
                    <Box sx={{ p: 3, bgcolor: alpha(theme.palette.background.default, 0.5), borderBottom: `1px solid ${theme.palette.divider}` }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>Class Roster ({students.length})</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button size="small" variant="outlined" sx={{ borderRadius: 2, fontWeight: 700 }}>Attendance Report</Button>
                                <Button size="small" variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>Export</Button>
                            </Stack>
                        </Stack>
                    </Box>
                    <List sx={{ p: 0 }}>
                        {students.map((student, index) => (
                            <Box key={student.id}>
                                <ListItem sx={{ p: 3 }}>
                                    <ListItemAvatar sx={{ mr: 2 }}>
                                        <Avatar sx={{ width: 48, height: 48, fontWeight: 800 }}>{student.name.charAt(0)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography sx={{ fontWeight: 800 }}>{student.name}</Typography>}
                                        secondary={student.email}
                                    />
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Stack direction="row" spacing={6} alignItems="center">
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="caption" color="text.secondary" display="block" fontWeight={700}>PERFORMANCE</Typography>
                                            <Typography variant="body2" fontWeight={900} color={student.performance > 85 ? 'success.main' : 'primary.main'}>
                                                {student.performance}%
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={student.status}
                                            size="small"
                                            color={student.status === 'Present' ? 'success' : 'error'}
                                            sx={{ fontWeight: 800, minWidth: 80 }}
                                        />
                                        <IconButton><Mail /></IconButton>
                                        <IconButton><MoreVert /></IconButton>
                                    </Stack>
                                </ListItem>
                                {index < students.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </List>
                </Paper>
            </CustomTabPanel>

            {/* 3. Assignments Tab */}
            <CustomTabPanel value={tabValue} index={2}>
                <Grid container spacing={4}>
                    {['Quiz 1: React Basics', 'Assignment 2: Next.js Layouts', 'Mid-Term Project'].map((title, i) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
                            <MotionCard
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                sx={{ borderRadius: 5, border: `1px solid ${theme.palette.divider}` }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Stack direction="row" justifyContent="space-between" mb={2}>
                                        <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main', borderRadius: 2 }}>
                                            <Assignment />
                                        </Avatar>
                                        <Chip label="Grading" size="small" color="warning" sx={{ fontWeight: 800 }} />
                                    </Stack>
                                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        Deadline: Feb 12, 2026
                                    </Typography>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="caption" fontWeight={700}>SUBMISSIONS: 12/24</Typography>
                                        <Button size="small" sx={{ fontWeight: 800 }}>Review</Button>
                                    </Stack>
                                </CardContent>
                            </MotionCard>
                        </Grid>
                    ))}
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Paper
                            sx={{
                                height: '100%',
                                minHeight: 180,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px dashed ${theme.palette.divider}`,
                                borderRadius: 5,
                                cursor: 'pointer',
                                transition: '0.2s',
                                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02), borderColor: 'primary.main' }
                            }}
                        >
                            <Stack alignItems="center" spacing={1}>
                                <Avatar sx={{ bgcolor: 'transparent', color: 'primary.main', border: `1px solid ${theme.palette.primary.main}` }}>
                                    <PlayArrow sx={{ transform: 'rotate(90deg)' }} />
                                </Avatar>
                                <Typography variant="body2" fontWeight={800} color="primary">Create Assignment</Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </CustomTabPanel>
        </Box>
    );
};

export default TeacherClassDetail;