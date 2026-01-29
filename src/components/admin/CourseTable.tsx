import {
    Box,
    Typography,
    Stack,
    Avatar,
    Chip,
    IconButton,
    alpha,
    useTheme
} from '@mui/material';
import {
    School,
    AttachMoney,
    SignalCellularAlt,
    MoreVert
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
    onMenuOpen: (event: React.MouseEvent<HTMLElement>, course: Course) => void;
    anchorEl: HTMLElement | null;
    selectedCourse: Course | null;
}

const CourseTable = ({
    courses,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onMenuOpen,
    anchorEl,
    selectedCourse
}: CourseTableProps) => {
    const theme = useTheme();

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
            minWidth: 150,
            format: (_, row) => (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton
                        size="small"
                        onClick={(e) => onMenuOpen(e, row)}
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

    return (
        <DataTable
            columns={columns}
            data={courses}
            totalCount={courses.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    );
};

export default CourseTable;
