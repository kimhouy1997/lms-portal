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
    IconButton,
    Chip,
    Tabs,
    Tab,
    Divider,
    alpha,
    useTheme,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Paper,
    MenuItem,
    Menu,
    Tooltip,
    Checkbox
} from '@mui/material';
// import { motion } from 'framer-motion';
import {
    Add,
    ExpandMore,
    VideoLibrary,
    PictureAsPdf,
    AssignmentOutlined,
    MoreVert,
    DragIndicator,
    ArrowBack,
    Settings,
    BarChart,
    CloudUpload,
    Save,
    Visibility,
    LibraryBooks,
    Edit,
    Delete
} from '@mui/icons-material';
import type { Course, Chapter, Lesson } from '@/types/adminCourse';
import { CourseStatus, DifficultyLevel } from '@/types/adminCourse';
import ChapterForm from '@/components/forms/ChapterForm';
import LessonForm from '@/components/forms/LessonForm';
import ResourceForm from '@/components/forms/ResourceForm';
import type { Resource } from '@/types/adminCourse';

// const MotionBox = motion(Box);
// const MotionCard = motion(Card);

// --- Sub-components ---

const LessonAccordion = ({
    lesson,
    onOpenLessonMenu
}: {
    lesson: Lesson;
    onOpenLessonMenu: (event: React.MouseEvent<HTMLElement>, lesson: Lesson) => void;
}) => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);
    const hasResources = lesson.resources && lesson.resources.length > 0;

    return (
        <Box sx={{ position: 'relative', mb: 1 }}>
            {/* Vertical line connecting to resources */}
            {hasResources && expanded && (
                <Box sx={{
                    position: 'absolute',
                    left: 20,
                    top: 40,
                    bottom: 20,
                    width: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    zIndex: 0
                }} />
            )}

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    bgcolor: expanded ? alpha(theme.palette.primary.main, 0.02) : 'transparent',
                    border: `1px solid ${expanded ? alpha(theme.palette.primary.main, 0.1) : 'transparent'}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        transform: 'translateX(4px)'
                    }
                }}
            >
                <ListItem
                    sx={{ py: 1.5, px: 2 }}
                    secondaryAction={
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <IconButton size="small" onClick={(e) => onOpenLessonMenu(e, lesson)}>
                                <MoreVert fontSize="small" />
                            </IconButton>
                            {hasResources && (
                                <IconButton
                                    size="small"
                                    onClick={() => setExpanded(!expanded)}
                                    sx={{
                                        transition: 'transform 0.3s',
                                        transform: expanded ? 'rotate(180deg)' : 'rotate(0)'
                                    }}
                                >
                                    <ExpandMore fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>
                    }
                >
                    <ListItemIcon sx={{ minWidth: 44 }}>
                        <Box sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: lesson.video_url ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.secondary.main, 0.1),
                            color: lesson.video_url ? 'primary.main' : 'secondary.main'
                        }}>
                            {lesson.video_url ? <VideoLibrary fontSize="small" /> : <PictureAsPdf fontSize="small" />}
                        </Box>
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'text.primary' }}>
                                    {lesson.title}
                                </Typography>
                                <Checkbox
                                    size="small"
                                    color="success"
                                    sx={{ p: 0 }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </Stack>
                        }
                        secondary={lesson.duration ? `${lesson.duration} • ${lesson.is_preview ? 'Preview' : 'Exclusive'}` : lesson.is_preview ? 'Preview' : 'Exclusive'}
                        secondaryTypographyProps={{ fontSize: '0.75rem', fontWeight: 600 }}
                        onClick={hasResources ? () => setExpanded(!expanded) : undefined}
                        sx={{ cursor: hasResources ? 'pointer' : 'default' }}
                    />
                </ListItem>
            </Paper >

            <Collapse in={expanded}>
                <List sx={{ pl: 5.5, py: 0.5 }}>
                    {lesson.resources?.map((resource) => (
                        <ListItem
                            key={resource.id}
                            sx={{
                                py: 1,
                                px: 2,
                                borderRadius: 2,
                                mb: 0.5,
                                position: 'relative',
                                '&:hover': { bgcolor: alpha(theme.palette.divider, 0.05) },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: -24,
                                    top: '50%',
                                    width: 16,
                                    height: 2,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                                }
                            }}
                        >
                            <ListItemText
                                primary={resource.title}
                                secondary={resource.type.toUpperCase()}
                                primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600 }}
                                secondaryTypographyProps={{ fontSize: '0.65rem', fontWeight: 900, color: 'primary.main', mt: 0.2 }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </Box >
    );
};

const ChapterAccordion = ({
    chapter,
    onAddLesson,
    onOpenLessonMenu
}: {
    chapter: Chapter;
    onAddLesson: (chapterId: number) => void;
    onOpenLessonMenu: (event: React.MouseEvent<HTMLElement>, lesson: Lesson) => void;
}) => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(true);

    return (
        <Box sx={{ mb: 3 }}>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        bgcolor: 'primary.main'
                    },
                    '&:hover': {
                        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                        borderColor: alpha(theme.palette.primary.main, 0.2)
                    }
                }}
                onClick={() => setExpanded(!expanded)}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <DragIndicator sx={{ color: 'text.disabled', cursor: 'grab', ml: 0.5 }} />
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: -0.5 }}>
                            {chapter.title}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                {chapter.lessons.length} Lessons
                            </Typography>
                            <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                {chapter.status.toUpperCase()}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip title="Add Lesson">
                        <IconButton
                            size="small"
                            onClick={(e) => { e.stopPropagation(); onAddLesson(chapter.id); }}
                            sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
                        >
                            <Add fontSize="small" color="primary" />
                        </IconButton>
                    </Tooltip>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); }}>
                        <Settings fontSize="small" sx={{ color: 'text.disabled' }} />
                    </IconButton>
                    <Box sx={{
                        ml: 1,
                        transition: 'transform 0.3s',
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0)'
                    }}>
                        <ExpandMore />
                    </Box>
                </Stack>
            </Box>

            <Collapse in={expanded}>
                <Box sx={{ pl: 3, pr: 1, pt: 2 }}>
                    {chapter.lessons.map((lesson) => (
                        <LessonAccordion
                            key={lesson.id}
                            lesson={lesson}
                            onOpenLessonMenu={onOpenLessonMenu}
                        />
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

// --- Main Page ---

const TeacherCourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [editingChapter, setEditingChapter] = useState<Partial<Chapter> | undefined>(undefined);
    const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [lessonMenuAnchor, setLessonMenuAnchor] = useState<null | HTMLElement>(null);

    // Mock Course Data
    const [course] = useState<Course>({
        id: Number(id),
        title: 'Modern React Architecture & Design Patterns',
        slug: 'react-architecture',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        level: DifficultyLevel.ADVANCED,
        status: CourseStatus.PUBLISHED,
        price: 99.99,
        is_free: false,
        technologies: [],
        chapters: [
            {
                id: 1,
                title: 'Introduction & Environment Setup',
                status: CourseStatus.PUBLISHED,
                lessons: [
                    {
                        id: 101, title: 'Course Overview', is_preview: true, status: CourseStatus.PUBLISHED, duration: '05:20', video_url: '...',
                        resources: [
                            { id: 1, title: 'Introduction Deck PDF', type: 'pdf' },
                            { id: 2, title: 'Project Template', type: 'text' }
                        ]
                    },
                    { id: 102, title: 'Installing Dependencies', is_preview: false, status: CourseStatus.PUBLISHED, duration: '12:45', video_url: '...' }
                ]
            },
            {
                id: 2,
                title: 'The Clean Architecture Pattern',
                status: CourseStatus.PUBLISHED,
                lessons: [
                    {
                        id: 201, title: 'Domain Layers', is_preview: false, status: CourseStatus.PUBLISHED, duration: '25:10', video_url: '...',
                        resources: [
                            { id: 3, title: 'Layer Diagram', type: 'pdf' },
                            { id: 4, title: 'Clean Code Checklist', type: 'text' }
                        ]
                    },
                    { id: 202, title: 'Data Mapping Strategies', is_preview: false, status: CourseStatus.PUBLISHED, duration: '18:30', video_url: '...' }
                ]
            }
        ],
        assignments: [
            { id: 1, title: 'Cleanup Code Challenge', type: 'task', total_points: 100, passing_score: 70, description: 'Refactor the given component...' },
            { id: 2, title: 'Architecture Quiz', type: 'quiz', total_points: 50, passing_score: 35, description: 'Test your knowledge on patterns.' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    const handleAddChapter = (data: Partial<Chapter>) => {
        console.log('Creating/Updating Chapter:', data);
        // Logic to update local state or call API would go here
    };

    const openCreateChapter = () => {
        setEditingChapter(undefined);
        setIsChapterModalOpen(true);
    };

    const handleOpenAddLesson = (chapterId: number) => {
        setSelectedChapterId(chapterId);
        setIsLessonModalOpen(true);
    };

    const handleLessonSubmit = (data: Partial<Lesson>) => {
        console.log('Adding lesson to chapter', selectedChapterId, ':', data);
    };

    const handleOpenLessonMenu = (event: React.MouseEvent<HTMLElement>, lesson: Lesson) => {
        setLessonMenuAnchor(event.currentTarget);
        setSelectedLesson(lesson);
    };

    const handleCloseLessonMenu = () => {
        setLessonMenuAnchor(null);
    };

    const handleOpenAddResource = () => {
        setIsResourceModalOpen(true);
        handleCloseLessonMenu();
    };

    const handleResourceSubmit = (data: Partial<Resource>) => {
        console.log('Adding resource to lesson', selectedLesson?.id, ':', data);
    };

    return (
        <Box sx={{ pb: 8 }}>
            {/* Header */}
            <Stack direction="row" spacing={2} sx={{ mb: 4 }} alignItems="center">
                <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
                    <ArrowBack />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -1 }}>
                            {course.title}
                        </Typography>
                        <Chip
                            label={course.status}
                            size="small"
                            color={course.status === CourseStatus.PUBLISHED ? 'success' : 'warning'}
                            sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem' }}
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Internal ID: #{course.id} • Last modified: {new Date(course.updatedAt).toLocaleDateString()}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<Visibility />} sx={{ borderRadius: 3, fontWeight: 700 }}>
                        View as Student
                    </Button>
                    <Button variant="contained" startIcon={<Save />} sx={{ borderRadius: 3, fontWeight: 800, px: 3 }}>
                        Save Changes
                    </Button>
                </Stack>
            </Stack>

            {/* Navigation Tabs */}
            <Paper sx={{ mb: 4, borderRadius: 4, overflow: 'hidden' }} elevation={0}>
                <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    sx={{
                        px: 2,
                        '& .MuiTabs-indicator': { height: 4, borderRadius: '4px 4px 0 0' },
                        '& .MuiTab-root': { py: 3, fontWeight: 800, minWidth: 120 }
                    }}
                >
                    <Tab icon={<LibraryBooks />} iconPosition="start" label="Curriculum" />
                    <Tab icon={<AssignmentOutlined />} iconPosition="start" label="Assignments" />
                    <Tab icon={<Settings />} iconPosition="start" label="Course Settings" />
                    <Tab icon={<BarChart />} iconPosition="start" label="Analytics" />
                </Tabs>
            </Paper>

            {/* Tab Panels */}
            <Box>
                {/* 1. Curriculum Tab */}
                {activeTab === 0 && (
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>Course Content</Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    sx={{ borderRadius: 2.5, fontWeight: 800 }}
                                    onClick={openCreateChapter}
                                >
                                    Add Chapter
                                </Button>
                            </Stack>

                            {course.chapters.map((chapter) => (
                                <ChapterAccordion
                                    key={chapter.id}
                                    chapter={chapter}
                                    onAddLesson={handleOpenAddLesson}
                                    onOpenLessonMenu={handleOpenLessonMenu}
                                />
                            ))}
                        </Grid>

                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Content Summary</Typography>
                            <Card sx={{ borderRadius: 4, border: `1px solid ${theme.palette.divider}` }} elevation={0}>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Total Chapters</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{course.chapters.length}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Total Lessons</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                {course.chapters.reduce((acc, c) => acc + c.lessons.length, 0)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Video Content</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>4h 32m</Typography>
                                        </Box>
                                        <Divider />
                                        <Button fullWidth variant="outlined" sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 700 }}>
                                            Bulk Lesson Upload
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                {/* 2. Assignments Tab */}
                {activeTab === 1 && (
                    <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>Predefined Assignments</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    These assignments can be reused across your different classes of this course.
                                </Typography>
                            </Box>
                            <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2.5, fontWeight: 800 }}>
                                New Assignment
                            </Button>
                        </Stack>

                        <Grid container spacing={3}>
                            {course.assignments?.map((assignment) => (
                                <Grid size={{ xs: 12, md: 6 }} key={assignment.id}>
                                    <Card sx={{ borderRadius: 4, border: `1px solid ${theme.palette.divider}`, '&:hover': { borderColor: theme.palette.primary.main } }} elevation={0}>
                                        <CardContent>
                                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                                <Box>
                                                    <Chip
                                                        label={assignment.type.toUpperCase()}
                                                        size="small"
                                                        sx={{ mb: 1.5, fontWeight: 900, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main' }}
                                                    />
                                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{assignment.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>{assignment.description}</Typography>
                                                </Box>
                                                <IconButton size="small"><MoreVert /></IconButton>
                                            </Stack>
                                            <Divider sx={{ mb: 2 }} />
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                                    Passing Score: <Box component="span" sx={{ color: 'primary.main' }}>{assignment.passing_score}/{assignment.total_points}</Box>
                                                </Typography>
                                                <Button size="small" sx={{ fontWeight: 700 }}>Edit Details</Button>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* 3. Settings Tab */}
                {activeTab === 2 && (
                    <Card sx={{ borderRadius: 5 }} elevation={0}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>General Information</Typography>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Course Title" defaultValue={course.title} sx={{ mb: 3 }} />
                                    <TextField fullWidth label="Course Slug" defaultValue={course.slug} sx={{ mb: 3 }} />
                                    <Stack direction="row" spacing={2}>
                                        <TextField fullWidth label="Price ($)" type="number" defaultValue={course.price} />
                                        <TextField fullWidth select label="Difficulty" defaultValue={course.level}>
                                            <MenuItem value={DifficultyLevel.BEGINNER}>Beginner</MenuItem>
                                            <MenuItem value={DifficultyLevel.INTERMEDIATE}>Intermediate</MenuItem>
                                            <MenuItem value={DifficultyLevel.ADVANCED}>Advanced</MenuItem>
                                        </TextField>
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>Course Thumbnail</Typography>
                                    <Box sx={{
                                        height: 200,
                                        borderRadius: 4,
                                        bgcolor: alpha(theme.palette.divider, 0.05),
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: `2px dashed ${theme.palette.divider}`,
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <img src={course.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
                                        <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                                            <CloudUpload sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Update Image</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Box>

            <ChapterForm
                key={isChapterModalOpen ? 'chapter-open' : 'chapter-closed'}
                open={isChapterModalOpen}
                onClose={() => setIsChapterModalOpen(false)}
                onSubmit={handleAddChapter}
                initialData={editingChapter}
            />

            <LessonForm
                key={isLessonModalOpen ? `lesson-${selectedChapterId}` : 'lesson-closed'}
                open={isLessonModalOpen}
                onClose={() => setIsLessonModalOpen(false)}
                onSubmit={handleLessonSubmit}
                chapterTitle={course.chapters.find(c => c.id === selectedChapterId)?.title}
            />

            <ResourceForm
                key={isResourceModalOpen ? `resource-${selectedLesson?.id}` : 'resource-closed'}
                open={isResourceModalOpen}
                onClose={() => setIsResourceModalOpen(false)}
                onSubmit={handleResourceSubmit}
                lessonTitle={selectedLesson?.title}
            />

            <Menu
                anchorEl={lessonMenuAnchor}
                open={Boolean(lessonMenuAnchor)}
                onClose={handleCloseLessonMenu}
                PaperProps={{ sx: { borderRadius: 3, minWidth: 180, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' } }}
            >
                <MenuItem onClick={handleOpenAddResource} sx={{ fontWeight: 600, py: 1.5 }}>
                    <ListItemIcon><Add color="primary" fontSize="small" /></ListItemIcon>
                    Add Resource
                </MenuItem>
                <MenuItem onClick={handleCloseLessonMenu} sx={{ fontWeight: 600, py: 1.5 }}>
                    <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
                    Edit Lesson
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseLessonMenu} sx={{ fontWeight: 600, py: 1.5, color: 'error.main' }}>
                    <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
                    Delete Lesson
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default TeacherCourseDetail;