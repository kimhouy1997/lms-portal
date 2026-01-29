import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    TextField,
    Avatar,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    useTheme,
    alpha,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    InputAdornment,
    Menu,
    ListItemIcon,
    ListItemText,
    Divider,
    type SelectChangeEvent
} from '@mui/material';
import {
    Add,
    Search,
    Edit,
    Delete,
    Visibility,
    School,
    AttachMoney,
    SignalCellularAlt,
    MoreVert
} from '@mui/icons-material';
import { DataTable, type Column } from '@/components/common/DataTable';

// Types based on provided Django Models
export const CourseStatus = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
} as const;
export type CourseStatus = typeof CourseStatus[keyof typeof CourseStatus];

export const DifficultyLevel = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced'
} as const;
export type DifficultyLevel = typeof DifficultyLevel[keyof typeof DifficultyLevel];

export interface Technology {
    id: number;
    name: string;
    thumbnail?: string;
    description?: string;
}

export interface Chapter {
    id: number;
    title: string;
    description?: string;
    status: CourseStatus;
}

export interface Course {
    id: number;
    title: string;
    description?: string;
    slug: string;
    short_summary?: string;
    thumbnail?: string;
    price: number;
    level: DifficultyLevel;
    status: CourseStatus;
    technologies: Technology[];
    chapters: Chapter[];
    createdAt: string;
    updatedAt: string;
}

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
        price: 79.50,
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, course: Course) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourse(course);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCourse(null);
    };

    // Form state
    const [formData, setFormData] = useState<Partial<Course>>({
        title: '',
        short_summary: '',
        price: 0,
        level: DifficultyLevel.BEGINNER,
        status: CourseStatus.DRAFT,
        technologies: []
    });

    const handleOpenModal = (course?: Course) => {
        if (course) {
            setEditingCourse(course);
            setFormData(course);
        } else {
            setEditingCourse(null);
            setFormData({
                title: '',
                short_summary: '',
                price: 0,
                level: DifficultyLevel.BEGINNER,
                status: CourseStatus.DRAFT,
                technologies: []
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingCourse(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const handleSubmit = () => {
        if (editingCourse) {
            setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...formData } as Course : c));
        } else {
            const newCourse: Course = {
                ...formData,
                id: Math.max(...courses.map(c => c.id), 0) + 1,
                slug: (formData.title || '').toLowerCase().replace(/ /g, '-'),
                chapters: [],
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            } as Course;
            setCourses([newCourse, ...courses]);
        }
        handleCloseModal();
    };

    const columns: Column<Course>[] = [
        {
            id: 'title',
            label: 'Course Info',
            minWidth: 300,
            format: (_, row) => (
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        variant="rounded"
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            borderRadius: 2
                        }}
                    >
                        <School />
                    </Avatar>
                    <Box sx={{ maxWidth: 250 }}>
                        <Typography variant="body2" sx={{ fontWeight: 800 }} noWrap>
                            {row.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap display="block">
                            {row.short_summary || 'No summary provided'}
                        </Typography>
                    </Box>
                </Stack>
            )
        },
        {
            id: 'price',
            label: 'Pricing',
            minWidth: 120,
            format: (value) => (
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <AttachMoney sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {Number(value).toFixed(2)}
                    </Typography>
                </Stack>
            )
        },
        {
            id: 'level',
            label: 'Difficulty',
            minWidth: 150,
            format: (value) => {
                let color: 'success' | 'warning' | 'error' = 'success';
                if (value === DifficultyLevel.INTERMEDIATE) color = 'warning';
                if (value === DifficultyLevel.ADVANCED) color = 'error';

                return (
                    <Chip
                        icon={<SignalCellularAlt sx={{ fontSize: '14px !important' }} />}
                        label={String(value).toUpperCase()}
                        size="small"
                        color={color}
                        sx={{ fontWeight: 900, fontSize: '0.65rem', borderRadius: 1.5 }}
                    />
                );
            }
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 130,
            format: (value) => (
                <Chip
                    label={String(value).toUpperCase()}
                    size="small"
                    variant="outlined"
                    sx={{
                        fontWeight: 900,
                        fontSize: '0.65rem',
                        borderRadius: 1.5,
                        borderColor: value === CourseStatus.PUBLISHED ? 'success.main' : value === CourseStatus.DRAFT ? 'warning.main' : 'error.main',
                        color: value === CourseStatus.PUBLISHED ? 'success.main' : value === CourseStatus.DRAFT ? 'warning.main' : 'error.main',
                        bgcolor: alpha(value === CourseStatus.PUBLISHED ? theme.palette.success.main : value === CourseStatus.DRAFT ? theme.palette.warning.main : theme.palette.error.main, 0.05)
                    }}
                />
            )
        },
        {
            id: 'actions',
            label: 'Management',
            align: 'right',
            minWidth: 150,
            format: (_, row) => (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, row)}
                        sx={{
                            bgcolor: anchorEl && selectedCourse?.id === row.id ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                            color: anchorEl && selectedCourse?.id === row.id ? 'primary.main' : 'text.secondary',
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) }
                        }}
                    >
                        <MoreVert fontSize="small" />
                    </IconButton>
                </Stack>
            )
        }
    ];

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.short_summary?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <DataTable
                columns={columns}
                data={filteredCourses}
                totalCount={filteredCourses.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
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
                    <Grid container spacing={3} sx={{ mt: 0 }}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Course Title"
                                value={formData.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Short Summary"
                                value={formData.short_summary}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, short_summary: e.target.value })}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Price ($)"
                                value={formData.price}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, price: Number(e.target.value) })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Difficulty Level</InputLabel>
                                <Select
                                    label="Difficulty Level"
                                    value={formData.level}
                                    onChange={(e: SelectChangeEvent<DifficultyLevel>) => setFormData({ ...formData, level: e.target.value as DifficultyLevel })}
                                    sx={{ borderRadius: 3 }}
                                >
                                    <MenuItem value={DifficultyLevel.BEGINNER}>Beginner</MenuItem>
                                    <MenuItem value={DifficultyLevel.INTERMEDIATE}>Intermediate</MenuItem>
                                    <MenuItem value={DifficultyLevel.ADVANCED}>Advanced</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    label="Status"
                                    value={formData.status}
                                    onChange={(e: SelectChangeEvent<CourseStatus>) => setFormData({ ...formData, status: e.target.value as CourseStatus })}
                                    sx={{ borderRadius: 3 }}
                                >
                                    <MenuItem value={CourseStatus.DRAFT}>Draft</MenuItem>
                                    <MenuItem value={CourseStatus.PUBLISHED}>Published</MenuItem>
                                    <MenuItem value={CourseStatus.ARCHIVED}>Archived</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                    <Button
                        onClick={handleCloseModal}
                        sx={{ fontWeight: 700, borderRadius: 2.5, color: 'text.secondary' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!formData.title}
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
                <MenuItem onClick={() => { handleMenuClose(); /* View Details logic */ }}>
                    <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
                    <ListItemText primary="View Details" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedCourse) handleOpenModal(selectedCourse);
                    handleMenuClose();
                }}>
                    <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Edit Course" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
                <Divider sx={{ my: 1, opacity: 0.5 }} />
                <MenuItem
                    onClick={() => {
                        if (selectedCourse) handleDelete(selectedCourse.id);
                        handleMenuClose();
                    }}
                    sx={{ color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.05) + ' !important' } }}
                >
                    <ListItemIcon><Delete fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
                    <ListItemText primary="Delete Course" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default CourseManagement;