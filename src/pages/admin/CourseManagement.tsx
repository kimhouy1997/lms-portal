import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    alpha,
    InputAdornment,
} from '@mui/material';
import {
    Add,
    Search,
} from '@mui/icons-material';
import type {
    Course,
    Technology
} from '@/types/adminCourse';
import {
    CourseStatus,
    DifficultyLevel
} from '@/types/adminCourse';
import CourseTable from '@/components/admin/CourseTable';
import CourseForm from '@/components/admin/CourseForm';
import { toast } from 'react-hot-toast';

// Mock Data
const initialTechnologies: Technology[] = [
    { id: 1, name: 'React', description: 'A JavaScript library for building user interfaces' },
    { id: 2, name: 'Next.js', description: 'The React Framework for the Web' },
    { id: 3, name: 'TypeScript', description: 'Strongly typed programming language that builds on JavaScript' },
    { id: 4, name: 'Python', description: 'General-purpose programming language' },
];

const mockCourses: Course[] = [
    {
        id: 1,
        title: 'Mastering React & Next.js 14',
        slug: 'mastering-react-nextjs-14',
        short_summary: 'Learn the latest features of React and Next.js by building real-world projects.',
        price: 99.99,
        is_free: false,
        level: DifficultyLevel.ADVANCED,
        status: CourseStatus.PUBLISHED,
        technologies: [initialTechnologies[0], initialTechnologies[1], initialTechnologies[2]],
        chapters: [],
        createdAt: '2025-10-01',
        updatedAt: '2025-11-15'
    },
    {
        id: 2,
        title: 'Python for Data Science',
        slug: 'python-for-data-science',
        short_summary: 'Comprehensive guide to Python for data analysis and visualization.',
        price: 0,
        is_free: true,
        level: DifficultyLevel.INTERMEDIATE,
        status: CourseStatus.DRAFT,
        technologies: [initialTechnologies[3]],
        chapters: [],
        createdAt: '2026-01-05',
        updatedAt: '2026-01-10'
    },
    {
        id: 3,
        title: 'Modern UI/UX Design Fundamentals',
        slug: 'modern-ui-ux-design',
        short_summary: 'Designing beautiful and functional user interfaces from scratch.',
        price: 49.99,
        is_free: false,
        level: DifficultyLevel.BEGINNER,
        status: CourseStatus.ARCHIVED,
        technologies: [],
        chapters: [],
        createdAt: '2025-05-20',
        updatedAt: '2025-06-01'
    }
];

const CourseManagement = () => {
    const theme = useTheme();
    const [courses, setCourses] = useState<Course[]>(mockCourses);
    const [searchQuery, setSearchQuery] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleOpenModal = (course?: Course) => {
        setEditingCourse(course || null);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingCourse(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCourses(prev => prev.filter(c => c.id !== id));
            toast.success('Course deleted successfully');
        }
    };

    const handleFormSubmit = (data: any) => {
        if (editingCourse) {
            setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...data, updatedAt: new Date().toISOString().split('T')[0] } as Course : c));
            toast.success('Course updated successfully');
        } else {
            const newCourse: Course = {
                ...data,
                id: Math.max(...courses.map(c => c.id), 0) + 1,
                slug: (data.title || '').toLowerCase().replace(/ /g, '-'),
                chapters: [],
                technologies: [], // Default for now
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            } as Course;
            setCourses(prev => [newCourse, ...prev]);
            toast.success('Course created successfully');
        }
        handleCloseModal();
    };

    const filteredCourses = useMemo(() =>
        courses.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.short_summary?.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [courses, searchQuery]);

    return (
        <Box sx={{ pb: 6 }}>
            {/* Header */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1.5, mb: 1 }}>
                        Course Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, opacity: 0.8 }}>
                        Create, update and manage all learning materials and curriculum structure.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenModal()}
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
                    Create New Course
                </Button>
            </Box>

            {/* Toolbar */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    placeholder="Search courses by title or summary..."
                    size="small"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    sx={{ maxWidth: 450, flexGrow: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 3, bgcolor: 'background.paper' }
                    }}
                />
            </Box>

            {/* Content Table */}
            <CourseTable
                courses={filteredCourses}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
                onView={(course) => console.log('View course', course)}
            />

            {/* Course Modal */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 6, p: 1 }
                }}
            >
                <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem', pb: 1 }}>
                    {editingCourse ? 'Edit Course' : 'Create New Course'}
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {editingCourse ? 'Update the details for this course.' : 'Fill in the details to launch a new learning experience.'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <CourseForm
                        id="course-form"
                        initialData={editingCourse || undefined}
                        onSubmit={handleFormSubmit}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                    <Button
                        onClick={handleCloseModal}
                        sx={{ fontWeight: 700, borderRadius: 2.5, color: 'text.secondary' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="course-form"
                        variant="contained"
                        sx={{
                            borderRadius: 2.5,
                            px: 4,
                            fontWeight: 800,
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                    >
                        {editingCourse ? 'Save Changes' : 'Launch Course'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CourseManagement;