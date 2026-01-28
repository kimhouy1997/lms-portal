import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    LinearProgress,
    Button,
    Stack,
    Tabs,
    Tab,
    Card,
    CardContent,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper,
    alpha,
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar
} from '@mui/material';
import {
    PlayCircleOutline,
    CheckCircle,
    Lock,
    ExpandMore,
    ArrowBack,
    ArrowForward,
    AssignmentTurnedIn,
    Description,
    HelpOutline,
    Schedule,
    CloudUpload,
    AutoAwesome,
    EmojiEvents
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const CourseDetail = () => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(1); // Default to 'Lessons'
    const [expandedSection, setExpandedSection] = useState<string | false>('section1');

    // Mock Data
    const courseData = {
        title: 'Advanced UX Design & Interaction Architecture',
        instructor: 'Alex Rivera',
        description: 'Master the art of creating seamless user experiences through advanced wireframing, interactive prototyping, and user psychology research.',
        progress: 65,
        lessonsCompleted: 8,
        totalLessons: 12,
        assignmentsCompleted: 2,
        totalAssignments: 3,
        timeLeft: '1h 20m'
    };

    const activeLessonData = {
        id: 2,
        title: 'Advanced Wirefaming & Component Architecture',
        duration: '15:20',
        type: 'video',
        content: 'https://images.unsplash.com/photo-1541462608141-ad60397d446a?auto=format&fit=crop&q=80&w=1200' // Mock video placeholder
    };

    const sections = [
        {
            id: 'section1',
            title: 'Module 1: Foundations & Research',
            lessons: [
                { id: 1, title: 'Introduction to UX Research', duration: '12:00', status: 'completed' },
                { id: 2, title: 'Advanced Wirefaming & Component Architecture', duration: '15:20', status: 'current' },
                { id: 3, title: 'User Persona Mapping', duration: '08:45', status: 'locked' },
            ]
        },
        {
            id: 'section2',
            title: 'Module 2: Interactive Prototyping',
            lessons: [
                { id: 4, title: 'Dynamic Variables in Figma', duration: '22:15', status: 'locked' },
                { id: 5, title: 'Conditional Logic & States', duration: '18:30', status: 'locked' },
            ]
        }
    ];

    const assignments = [
        { id: 1, title: 'User Research Case Study', dueDate: 'May 15, 2026', status: 'submitted', feedback: 'Great work on the empathy maps!' },
        { id: 2, title: 'E-commerce Wireframe Suite', dueDate: 'May 22, 2026', status: 'pending', feedback: null },
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ pb: 10 }}>
            {/* 1. Course Header */}
            <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{
                    p: 4,
                    borderRadius: 6,
                    bgcolor: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${theme.palette.divider}`,
                    mb: 4,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 900 }}>UX</Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                Course by {courseData.instructor}
                            </Typography>
                        </Stack>
                        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: -1 }}>
                            {courseData.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, opacity: 0.8 }}>
                            {courseData.description}
                        </Typography>

                        <Grid container spacing={3} alignItems="center">
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>Course Progress</Typography>
                                        <Typography variant="body2" color="primary" sx={{ fontWeight: 800 }}>{courseData.progress}%</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={courseData.progress}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            '& .MuiLinearProgress-bar': { borderRadius: 4 }
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<PlayCircleOutline />}
                                    sx={{ borderRadius: 3, px: 4, fontWeight: 700, height: 50, width: { xs: '100%', sm: 'auto' } }}
                                >
                                    Continue Learning
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 4, textAlign: 'center' }}>
                            <EmojiEvents sx={{ fontSize: 60, color: 'warning.main', mb: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Keep it up!</Typography>
                            <Typography variant="body2" color="text.secondary">You are in the top 10% of this class.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </MotionBox>

            {/* 2. Learning Navigation - TABS */}
            <Paper elevation={0} sx={{
                position: 'sticky',
                top: 80,
                zIndex: 10,
                borderRadius: 4,
                mb: 4,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)'
            }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    centered
                    sx={{
                        '& .MuiTabs-indicator': { height: 4, borderRadius: 2 },
                        '& .MuiTab-root': { fontWeight: 800, py: 2.5, transition: '0.2s' }
                    }}
                >
                    <Tab icon={<AutoAwesome sx={{ mr: 1 }} />} iconPosition="start" label="Overview" />
                    <Tab icon={<Description sx={{ mr: 1 }} />} iconPosition="start" label="Lessons" />
                    <Tab icon={<AssignmentTurnedIn sx={{ mr: 1 }} />} iconPosition="start" label="Assignments" />
                </Tabs>
            </Paper>

            <Grid container spacing={4}>
                {/* MAIN CONTENT AREA */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <AnimatePresence mode="wait">
                        {activeTab === 0 && (
                            <MotionBox
                                key="tab-overview"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                <Card sx={{ borderRadius: 4, mb: 4 }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>About this Course</Typography>
                                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>What you will learn</Typography>
                                        <List sx={{ columns: { sm: 2 } }}>
                                            {['User Psychology', 'Advanced Grid Systems', 'Accessibility Patterns', 'Interactive States', 'Design Systems', 'Micro-interactions'].map((item) => (
                                                <ListItem key={item} disablePadding sx={{ py: 1 }}>
                                                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircle color="success" sx={{ fontSize: 18 }} /></ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </MotionBox>
                        )}

                        {activeTab === 1 && (
                            <MotionBox
                                key="tab-lessons"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {/* 4. Current Lesson Viewer */}
                                <MotionPaper sx={{ borderRadius: 6, overflow: 'hidden', mb: 4, bgcolor: 'black' }}>
                                    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                                        <Box
                                            component="img"
                                            src={activeLessonData.content}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            p: 4,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                                        }}>
                                            <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 800, mb: 0.5 }}>NOW PLAYING</Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 900, color: 'white' }}>{activeLessonData.title}</Typography>
                                        </Box>
                                        <IconButton sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            bgcolor: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(10px)',
                                            color: 'white',
                                            p: 3,
                                            '&:hover': { bgcolor: 'primary.main' }
                                        }}>
                                            <PlayCircleOutline sx={{ fontSize: 60 }} />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.paper' }}>
                                        <Stack direction="row" spacing={1}>
                                            <Button variant="outlined" startIcon={<ArrowBack />} sx={{ borderRadius: 2 }}>Prev</Button>
                                            <Button variant="outlined" endIcon={<ArrowForward />} sx={{ borderRadius: 2 }}>Next</Button>
                                        </Stack>
                                        <Button variant="contained" color="success" startIcon={<CheckCircle />} sx={{ borderRadius: 2, fontWeight: 700 }}>
                                            Mark as Completed
                                        </Button>
                                    </Box>
                                </MotionPaper>

                                {/* 3. Lessons List - SECIONS */}
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Course Curriculum</Typography>
                                {sections.map((section) => (
                                    <Accordion
                                        key={section.id}
                                        expanded={expandedSection === section.id}
                                        onChange={() => setExpandedSection(expandedSection === section.id ? false : section.id)}
                                        sx={{
                                            mb: 2,
                                            borderRadius: '16px !important',
                                            overflow: 'hidden',
                                            '&:before': { display: 'none' },
                                            border: `1px solid ${theme.palette.divider}`
                                        }}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMore />}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{section.title}</Typography>
                                            <Typography variant="caption" sx={{ ml: 2, mt: 0.5, color: 'text.secondary' }}>
                                                {section.lessons.length} lessons • {section.lessons.filter(l => l.status === 'completed').length} completed
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ p: 0 }}>
                                            <List disablePadding>
                                                {section.lessons.map((lesson) => {
                                                    const isCurrent = lesson.status === 'current';
                                                    const isLocked = lesson.status === 'locked';
                                                    const isCompleted = lesson.status === 'completed';

                                                    return (
                                                        <ListItem key={lesson.id} disablePadding>
                                                            <ListItemButton sx={{
                                                                py: 2,
                                                                px: 3,
                                                                bgcolor: isCurrent ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                                                                borderLeft: isCurrent ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent'
                                                            }}>
                                                                <ListItemIcon sx={{ minWidth: 40 }}>
                                                                    {isCompleted && <CheckCircle color="success" />}
                                                                    {isCurrent && <PlayCircleOutline color="primary" />}
                                                                    {isLocked && <Lock color="disabled" />}
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={lesson.title}
                                                                    primaryTypographyProps={{
                                                                        fontWeight: isCurrent ? 800 : 500,
                                                                        color: isLocked ? 'text.secondary' : 'text.primary'
                                                                    }}
                                                                    secondary={lesson.duration}
                                                                />
                                                                {isCurrent && (
                                                                    <Typography variant="caption" sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1, fontWeight: 800 }}>
                                                                        CURRENTLY VIEWING
                                                                    </Typography>
                                                                )}
                                                            </ListItemButton>
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </MotionBox>
                        )}

                        {activeTab === 2 && (
                            <MotionBox
                                key="tab-assignments"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {/* 5. Assignment Section */}
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Your Assignments</Typography>
                                <Grid container spacing={3}>
                                    {assignments.map((assignment) => (
                                        <Grid key={assignment.id} size={{ xs: 12 }}>
                                            <Card sx={{ borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
                                                <CardContent sx={{ p: 3 }}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{assignment.title}</Typography>
                                                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                                    <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>Due: {assignment.dueDate}</Typography>
                                                                </Stack>
                                                                <Chip
                                                                    size="small"
                                                                    label={assignment.status.toUpperCase()}
                                                                    color={assignment.status === 'submitted' ? 'success' : 'warning'}
                                                                    sx={{ fontWeight: 800, fontSize: '0.65rem' }}
                                                                />
                                                            </Stack>
                                                        </Box>
                                                        {assignment.status === 'pending' ? (
                                                            <Button variant="contained" startIcon={<CloudUpload />} sx={{ borderRadius: 2 }}>
                                                                Upload Submission
                                                            </Button>
                                                        ) : (
                                                            <Button variant="outlined" startIcon={<Description />} sx={{ borderRadius: 2 }}>
                                                                View Submission
                                                            </Button>
                                                        )}
                                                    </Stack>
                                                    {assignment.feedback && (
                                                        <Box sx={{ mt: 2, p: 2, bgcolor: alpha(theme.palette.success.main, 0.05), borderRadius: 2 }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 0.5 }}>INSTRUCTOR FEEDBACK:</Typography>
                                                            <Typography variant="body2">{assignment.feedback}</Typography>
                                                        </Box>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </MotionBox>
                        )}
                    </AnimatePresence>
                </Grid>

                {/* SIDEBAR: 6. Progress & Summary */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Stack spacing={4} sx={{ position: 'sticky', top: 180 }}>
                        <Paper sx={{ p: 4, borderRadius: 6, bgcolor: alpha(theme.palette.primary.main, 0.02), border: `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Progress Summary</Typography>
                            <Stack spacing={3}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 3 }}>
                                        <Description color="success" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>{courseData.lessonsCompleted} / {courseData.totalLessons}</Typography>
                                        <Typography variant="caption" color="text.secondary">Lessons Completed</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 3 }}>
                                        <AssignmentTurnedIn color="info" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>{courseData.assignmentsCompleted} / {courseData.totalAssignments}</Typography>
                                        <Typography variant="caption" color="text.secondary">Assignments Completed</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 3 }}>
                                        <Schedule color="warning" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>{courseData.timeLeft}</Typography>
                                        <Typography variant="caption" color="text.secondary">Estimated Time Remaining</Typography>
                                    </Box>
                                </Box>
                            </Stack>

                            <Divider sx={{ my: 3 }} />

                            <Button fullWidth variant="outlined" sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}>
                                Download Course Syllabus
                            </Button>
                        </Paper>

                        {/* 7. Support / Help */}
                        <Paper sx={{ p: 4, borderRadius: 6, bgcolor: 'background.paper', border: `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>Need Help?</Typography>
                            <Stack spacing={2}>
                                <ListItemButton sx={{ borderRadius: 3 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}><HelpOutline color="primary" /></ListItemIcon>
                                    <ListItemText primary="Visit Support Center" primaryTypographyProps={{ fontWeight: 700, fontSize: '0.9rem' }} />
                                </ListItemButton>
                                <ListItemButton sx={{ borderRadius: 3 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}><Avatar sx={{ width: 24, height: 24 }}>A</Avatar></ListItemIcon>
                                    <ListItemText primary="Contact Instructor" primaryTypographyProps={{ fontWeight: 700, fontSize: '0.9rem' }} />
                                </ListItemButton>
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

// Internal Chip substitute to avoid unused import if needed elsewhere
const Chip = ({ label, color, size, sx }: any) => {
    const theme = useTheme();
    const bgcolor = color === 'success' ? theme.palette.success.main : theme.palette.warning.main;
    return (
        <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: size === 'small' ? 1.5 : 2,
            py: size === 'small' ? 0.4 : 0.8,
            borderRadius: 1,
            bgcolor: alpha(bgcolor, 0.1),
            color: bgcolor,
            ...sx
        }}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>{label}</Typography>
        </Box>
    );
};

export default CourseDetail;
