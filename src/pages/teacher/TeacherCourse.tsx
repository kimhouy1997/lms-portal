import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Stack,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    InputAdornment,
    alpha,
    useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Add,
    People,
    School,
    LibraryBooks,
    ArrowForward,
    Search,
    Star,
    Close,
    Save
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Course, Lesson } from '@/types/adminCourse';
import { DifficultyLevel, CourseStatus } from '@/types/adminCourse';
import CourseForm from '@/components/admin/CourseForm';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

// --- Components ---
interface TeachingCourse {
    id: number;
    title: string;
    thumbnail: string;
    level: DifficultyLevel;
    status: string;
    studentCount: number;
    lessonCount: number;
    rating: number;
}

const TeacherCourseCard = ({
    course,
    onAddLesson
}: {
    course: TeachingCourse;
    onAddLesson: (course: TeachingCourse) => void;
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 5,
                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                cursor: 'pointer'
            }}
            onClick={() => navigate(`/teacher/courses/${course.id}`)}
        >
            <Box sx={{ position: 'relative', height: 180 }}>
                <CardMedia
                    component="img"
                    height="180"
                    image={course.thumbnail}
                    alt={course.title}
                />
                <Box sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                }}>
                    <Chip
                        label={course.status.toUpperCase()}
                        size="small"
                        sx={{
                            fontWeight: 900,
                            fontSize: '0.65rem',
                            bgcolor: course.status === 'published' ? 'success.main' : 'warning.main',
                            color: 'white',
                            backdropFilter: 'blur(4px)',
                            px: 1
                        }}
                    />
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" color="primary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                            {course.level}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                            <Typography variant="caption" sx={{ fontWeight: 800 }}>{course.rating || '4.5'}</Typography>
                        </Stack>
                    </Stack>
                    <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.3, height: '3.4rem', overflow: 'hidden' }}>
                        {course.title}
                    </Typography>
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 6 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                                <People sx={{ fontSize: 18, color: 'primary.main' }} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: -0.5 }}>{course.studentCount}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>Students</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.secondary.main, 0.1) }}>
                                <LibraryBooks sx={{ fontSize: 18, color: 'secondary.main' }} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: -0.5 }}>{course.lessonCount}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>Lessons</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Stack spacing={1.5} sx={{ mt: 'auto' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForward />}
                        sx={{
                            borderRadius: 3,
                            py: 1.2,
                            fontWeight: 800,
                            textTransform: 'none',
                            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/teacher/courses/${course.id}`);
                        }}
                    >
                        Management Course
                    </Button>

                </Stack>
            </CardContent>
        </MotionCard>
    );
};

// --- Main Page ---

const TeacherCourse = () => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<TeachingCourse | null>(null);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [courseFormData, setCourseFormData] = useState<Partial<Course>>({
        status: CourseStatus.DRAFT,
        level: DifficultyLevel.BEGINNER,
        is_free: true,
        price: 0
    });

    const [mockTeacherCourses, setMockTeacherCourses] = useState<TeachingCourse[]>([
        {
            id: 1,
            title: 'Modern React Architecture & Design Patterns',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
            level: DifficultyLevel.ADVANCED,
            status: 'published',
            studentCount: 1240,
            lessonCount: 42,
            rating: 4.9
        },
        {
            id: 2,
            title: 'Full-Stack Development with Next.js 15 & Prisma',
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
            level: DifficultyLevel.INTERMEDIATE,
            status: 'published',
            studentCount: 840,
            lessonCount: 65,
            rating: 4.8
        },
        {
            id: 3,
            title: 'Python for Data Science & Machine Learning',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
            level: DifficultyLevel.BEGINNER,
            status: 'draft',
            studentCount: 0,
            lessonCount: 12,
            rating: 4.5
        }
    ]);

    const handleAddLesson = (course: TeachingCourse) => {
        setSelectedCourse(course);
        setIsLessonModalOpen(true);
    };

    const handleAddLessonSubmit = (lesson: Partial<Lesson>) => {
        if (!selectedCourse) return;
        console.log('Adding lesson to', selectedCourse.title, ':', lesson);
        setMockTeacherCourses(prev => prev.map(c =>
            c.id === selectedCourse.id
                ? { ...c, lessonCount: c.lessonCount + 1 }
                : c
        ));
    };

    const handleCreateCourse = () => {
        const newId = mockTeacherCourses.length + 1;
        const newCourse = {
            id: newId,
            title: courseFormData.title || 'Untitled Course',
            thumbnail: courseFormData.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
            level: courseFormData.level || DifficultyLevel.BEGINNER,
            status: courseFormData.status || 'draft',
            studentCount: 0,
            lessonCount: 0,
            rating: 0
        };
        setMockTeacherCourses([newCourse, ...mockTeacherCourses]);
        setIsCourseModalOpen(false);
        setCourseFormData({ status: CourseStatus.DRAFT, level: DifficultyLevel.BEGINNER, is_free: true, price: 0 });
    };

    const filteredCourses = mockTeacherCourses.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ pb: 8 }}>
            {/* Header Area */}
            <Box sx={{ mb: 6 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: -1.5 }}>
                            My Teaching <Box component="span" sx={{ color: 'primary.main' }}>Curriculum</Box>
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, opacity: 0.8 }}>
                            Manage your academic content and track student success across <Box component="span" sx={{ color: 'text.primary', fontWeight: 800 }}>{mockTeacherCourses.length} courses</Box>.
                        </Typography>
                    </Grid>

                </Grid>
            </Box>

            {/* Stats Overview */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                {[
                    { label: 'Enrolled Students', value: mockTeacherCourses.reduce((acc, c) => acc + c.studentCount, 0).toLocaleString(), icon: <People />, color: 'primary' },
                    { label: 'Total Content', value: mockTeacherCourses.reduce((acc, c) => acc + c.lessonCount, 0) + ' Lessons', icon: <LibraryBooks />, color: 'secondary' },
                    { label: 'Avg Rating', value: '4.85', icon: <Star />, color: 'warning' },
                ].map((stat, i) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={i}>
                        <MotionBox
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            sx={{
                                p: 3,
                                borderRadius: 5,
                                bgcolor: alpha(theme.palette[stat.color as 'primary' | 'secondary' | 'warning' | 'success'].main, 0.05),
                                border: `1px solid ${alpha(theme.palette[stat.color as 'primary' | 'secondary' | 'warning' | 'success'].main, 0.1)}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2.5
                            }}
                        >
                            <Box sx={{
                                width: 52,
                                height: 52,
                                borderRadius: 3,
                                bgcolor: `${stat.color}.main`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                boxShadow: `0 8px 16px ${alpha(theme.palette[stat.color as 'primary' | 'secondary' | 'warning' | 'success'].main, 0.2)}`
                            }}>
                                {stat.icon}
                            </Box>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 900 }}>{stat.value}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                                    {stat.label.toUpperCase()}
                                </Typography>
                            </Box>
                        </MotionBox>
                    </Grid>
                ))}
            </Grid>

            {/* Courses Display */}
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <School color="primary" /> In-Progress Courses
            </Typography>

            <AnimatePresence>
                <Grid container spacing={4}>
                    {filteredCourses.map((course) => (
                        <Grid key={course.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                            <TeacherCourseCard
                                course={course}
                                onAddLesson={handleAddLesson}
                            />
                        </Grid>
                    ))}
                </Grid>
            </AnimatePresence>


        </Box>
    );
};

export default TeacherCourse;