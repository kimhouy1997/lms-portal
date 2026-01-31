import { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Avatar,
    Chip,
    IconButton,
    alpha,
    useTheme,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    School,
    AttachMoney,
    SignalCellularAlt,
    MoreVert,
    Visibility,
    Edit,
    Delete
} from '@mui/icons-material';
import { DataTable, type Column } from '@/components/common/DataTable';
import type { Course } from '@/types/adminCourse';
import { CourseStatus, DifficultyLevel } from '@/types/adminCourse';

interface CourseTableProps {
    courses: Course[];
    page: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
    onEdit: (course: Course) => void;
    onDelete: (id: number) => void;
    onView: (course: Course) => void;
    isLoading?: boolean;
}

const CourseTable = ({
    courses,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onEdit,
    onDelete,
    onView,
    isLoading
}: CourseTableProps) => {
    const theme = useTheme();
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

    const columns: Column<Course>[] = [
        {
            id: 'title',
            label: 'Course Info',
            minWidth: 300,
            format: (_, row) => (
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        variant="rounded"
                        src={row.thumbnail}
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            borderRadius: 2
                        }}
                    >
                        {!row.thumbnail && <School />}
                    </Avatar>
                    <Box sx={{ maxWidth: 250 }}>
                        <Typography variant="body2" sx={{ fontWeight: 800 }} noWrap title={row.title}>
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
            format: (value, row) => (
                <Stack direction="row" spacing={0.5} alignItems="center">
                    {row.is_free ? (
                        <Chip
                            label="FREE"
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{ fontWeight: 900, fontSize: '0.65rem', borderRadius: 1.5 }}
                        />
                    ) : (
                        <>
                            <AttachMoney sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                {Number(value).toFixed(2)}
                            </Typography>
                        </>
                    )}
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
            minWidth: 100,
            format: (_, row) => (
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
            )
        }
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={courses}
                totalCount={courses.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                isLoading={isLoading}
            />

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
                <MenuItem onClick={() => { handleMenuClose(); if (selectedCourse) onView(selectedCourse); }}>
                    <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
                    <ListItemText primary="View Details" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedCourse) onEdit(selectedCourse);
                    handleMenuClose();
                }}>
                    <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Edit Course" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
                <Divider sx={{ my: 1, opacity: 0.5 }} />
                <MenuItem
                    onClick={() => {
                        if (selectedCourse) onDelete(selectedCourse.id);
                        handleMenuClose();
                    }}
                    sx={{ color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.05) + ' !important' } }}
                >
                    <ListItemIcon><Delete fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
                    <ListItemText primary="Delete Course" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
            </Menu>
        </>
    );
};

export default CourseTable;
