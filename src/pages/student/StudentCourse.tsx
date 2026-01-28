import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    LinearProgress,
    Card,
    CardContent,
    CardMedia,
    Button,
    Stack,
    Tabs,
    Tab,
    alpha,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import {
    PlayCircleOutline,
    Schedule,
    AutoAwesome,
    TrendingUp,
    EmojiEvents
} from '@mui/icons-material';
import { useAppSelector } from '@/redux/hooks';
import CourseCard from '@/components/cards/CourseCard';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const EnrolledCourseCard = ({ course }: { course: any }) => {
    const theme = useTheme();

    return (
        <MotionCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5, boxShadow: theme.shadows[4] }}
            sx={{
                display: 'flex',
                height: 140,
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
                transition: '0.3s'
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: { xs: 100, sm: 160 }, height: '100%', objectFit: 'cover' }}
                image={course.image}
                alt={course.title}
            />
            <CardContent sx={{
                flex: 1,
                p: { xs: 1.5, sm: 2.5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&:last-child': { pb: { xs: 1.5, sm: 2.5 } }
            }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 1.5, height: '2.8rem', overflow: 'hidden' }}>
                    {course.title}
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Progress
                        </Typography>
                        <Typography variant="caption" color="primary" sx={{ fontWeight: 800 }}>
                            {course.progress}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '& .MuiLinearProgress-bar': { borderRadius: 3 }
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {course.remaining}
                        </Typography>
                    </Stack>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<PlayCircleOutline sx={{ fontSize: '1rem !important' }} />}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 2
                        }}
                    >
                        Continue
                    </Button>
                </Box>
            </CardContent>
        </MotionCard>
    );
};

const StudentCourse = () => {
    const theme = useTheme();
    const { user } = useAppSelector((state) => state.auth);
    const [tab, setTab] = useState(0);

    const enrolledCourses = [
        {
            id: 1,
            title: 'Advanced AI & Machine Learning Specialization',
            category: 'Data Science',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
            progress: 65,
            remaining: '4h 30m'
        },
        {
            id: 2,
            title: 'Mastering UI/UX Design with Figma',
            category: 'Design',
            image: 'https://images.unsplash.com/photo-1541462608141-ad60397d446a?auto=format&fit=crop&q=80&w=800',
            progress: 42,
            remaining: '8h 15m'
        },
        {
            id: 3,
            title: 'Full-Stack Web Development Boot Camp',
            category: 'Programming',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
            progress: 88,
            remaining: '1h 20m'
        },
        {
            id: 4,
            title: 'Cybersecurity Fundamentals & Threat Hunting',
            category: 'Security',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            progress: 15,
            remaining: '12h 45m'
        }
    ];

    const recommendedCourses = [
        {
            title: 'Next.js 15 Masterclass',
            instructor: 'Sarah Jenkins',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
            price: '$49.99',
            rating: 4.9,
            students: 1250,
            duration: '12h 45m',
            category: 'Web Dev',
            isNew: true
        },
        {
            title: 'Cloud Architecture & AWS',
            instructor: 'Michael Chen',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
            price: '$79.99',
            rating: 4.8,
            students: 3400,
            duration: '22h 30m',
            category: 'Cloud',
            isBestseller: true
        }
    ];

    return (
        <Box sx={{ pb: 8 }}>
            {/* Hero Section */}
            <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{
                    p: 4,
                    borderRadius: 6,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    mb: 6,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: -1 }}>
                            Hello, {user?.username || 'Learner'}! 👋
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, opacity: 0.8 }}>
                            You've completed <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>68%</Box> of your weekly goal. Keep it up!
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" size="large" sx={{ borderRadius: 3, px: 4, fontWeight: 700 }}>
                                Continue Learning
                            </Button>
                            <Button variant="outlined" size="large" sx={{ borderRadius: 3, px: 4, fontWeight: 700 }}>
                                View Certificates
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        <Box sx={{
                            width: 180,
                            height: 180,
                            borderRadius: '50%',
                            background: `conic-gradient(${theme.palette.primary.main} 0% 68%, ${alpha(theme.palette.primary.main, 0.1)} 68% 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.2)}`
                        }}>
                            <Box sx={{
                                width: 140,
                                height: 140,
                                borderRadius: '50%',
                                bgcolor: 'background.paper',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <EmojiEvents sx={{ color: 'warning.main', fontSize: 40, mb: 0.5 }} />
                                <Typography variant="h4" sx={{ fontWeight: 900 }}>68%</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>WEEKLY TASK</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </MotionBox>

            {/* Enrolled Courses Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TrendingUp color="primary" /> My Courses
                    </Typography>
                    <Tabs
                        value={tab}
                        onChange={(_, v) => setTab(v)}
                        sx={{
                            '& .MuiTabs-indicator': { height: 4, borderRadius: 2 },
                            '& .MuiTab-root': { fontWeight: 700, minWidth: 0, px: 0, mr: 4 }
                        }}
                    >
                        <Tab label="All Courses (6)" />
                        <Tab label="In Progress (3)" />
                        <Tab label="Completed (3)" />
                    </Tabs>
                </Box>
                <Button endIcon={<AutoAwesome />} color="inherit" sx={{ fontWeight: 700 }}>
                    Study Planner
                </Button>
            </Box>

            {/* Courses Grid - TWO COLUMN LAYOUT */}
            <Grid container spacing={3} sx={{ mb: 8 }}>
                {enrolledCourses.map((course) => (
                    <Grid key={course.id} size={{ xs: 12, lg: 6 }}>
                        <EnrolledCourseCard course={course} />
                    </Grid>
                ))}
            </Grid>

            {/* Recommendations Section */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <AutoAwesome sx={{ color: 'primary.main' }} /> Recommended for You
                    </Typography>
                    <Button variant="text" sx={{ fontWeight: 700 }}>Explore More</Button>
                </Stack>
                <Grid container spacing={3}>
                    {recommendedCourses.map((course, idx) => (
                        <Grid key={idx} size={{ xs: 12, sm: 6, lg: 4 }}>
                            <CourseCard {...course} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};


export default StudentCourse;