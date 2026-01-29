import { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Avatar,
    Chip,
    useTheme,
    alpha,
    Tooltip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    TextField,
    InputAdornment
} from '@mui/material';
import {
    Visibility,
    TrendingUp,
    FilterList,
    MoreVert,
    Search,
    Download
} from '@mui/icons-material';
import type { Student } from '../../pages/teacher/TeacherStudent';

interface StudentTableProps {
    students: Student[];
}

const StudentTable = ({ students }: StudentTableProps) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toString().includes(searchQuery)
    );

    const paginatedStudents = filteredStudents.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const getStatusColor = (status: string): 'success' | 'info' | 'warning' | 'error' | 'default' => {
        switch (status) {
            case 'Active': return 'success';
            case 'Completed': return 'info';
            case 'At Risk': return 'error';
            case 'Inactive': return 'warning';
            default: return 'default';
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 6,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: 'background.paper',
                boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.03)}`
            }}
        >
            {/* Custom Toolbar */}
            <Box sx={{ p: 2.5, borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flexGrow: 1, maxWidth: 450 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search students by name, email or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                                </InputAdornment>
                            ),
                            sx: {
                                bgcolor: alpha(theme.palette.background.default, 0.5),
                                borderRadius: 3,
                                height: 42,
                                '& fieldset': { border: `1px solid ${theme.palette.divider}` },
                                '&:hover fieldset': { borderColor: theme.palette.primary.main },
                                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main, borderWidth: '1px' },
                            }
                        }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" spacing={1.5}>
                    <Tooltip title="Export Data">
                        <IconButton
                            sx={{
                                borderRadius: 2.5,
                                border: `1px solid ${theme.palette.divider}`,
                                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05), color: 'primary.main', borderColor: theme.palette.primary.main }
                            }}
                        >
                            <Download sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filter Students">
                        <Paper
                            variant="outlined"
                            component="button"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                px: 2,
                                borderRadius: 2.5,
                                gap: 1,
                                cursor: 'pointer',
                                bgcolor: 'transparent',
                                color: 'text.secondary',
                                fontWeight: 700,
                                border: `1px solid ${theme.palette.divider}`,
                                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05), color: 'primary.main', border: `1px solid ${theme.palette.primary.main}` }
                            }}
                        >
                            <FilterList sx={{ fontSize: 18 }} />
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Filters</Typography>
                        </Paper>
                    </Tooltip>
                </Stack>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: alpha(theme.palette.background.default, 0.8) }}>
                            <TableCell sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5, color: 'text.secondary', py: 2.5 }}>
                                Student Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5, color: 'text.secondary', py: 2.5 }}>
                                Email Address
                            </TableCell>
                            <TableCell sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5, color: 'text.secondary', py: 2.5 }}>
                                Overall Progress
                            </TableCell>
                            <TableCell sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5, color: 'text.secondary', py: 2.5 }}>
                                Student Status
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5, color: 'text.secondary', py: 2.5 }}>
                                Management
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedStudents.map((student) => (
                            <TableRow
                                key={student.id}
                                sx={{
                                    transition: '0.2s',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                                    }
                                }}
                            >
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            sx={{
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: 'primary.main',
                                                fontWeight: 800,
                                                width: 40,
                                                height: 40,
                                                fontSize: '0.9rem',
                                                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
                                            }}
                                        >
                                            {student.name.charAt(0)}
                                        </Avatar>
                                        <Box sx={{ overflow: 'hidden' }}>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }} noWrap>
                                                {student.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                ID: #{student.id.toString().padStart(4, '0')}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        {student.email}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ minWidth: 200 }}>
                                    <Box sx={{ width: '100%', pr: 2 }}>
                                        <Stack direction="row" justifyContent="space-between" mb={0.75} alignItems="center">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <TrendingUp sx={{ fontSize: 14, color: student.progress > 80 ? 'success.main' : student.progress < 40 ? 'error.main' : 'primary.main' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary' }}>{student.progress}%</Typography>
                                            </Box>
                                        </Stack>
                                        <Box sx={{ width: '100%', height: 6, bgcolor: alpha(theme.palette.divider, 0.5), borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                                            <Box sx={{
                                                width: `${student.progress}%`,
                                                height: '100%',
                                                bgcolor: student.progress > 80 ? 'success.main' : student.progress < 40 ? 'error.main' : 'primary.main',
                                                borderRadius: 4,
                                                boxShadow: `0 0 8px ${alpha(student.progress > 80 ? theme.palette.success.main : student.progress < 40 ? theme.palette.error.main : theme.palette.primary.main, 0.4)}`
                                            }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={student.status}
                                        size="small"
                                        color={getStatusColor(student.status)}
                                        variant="outlined"
                                        sx={{
                                            fontWeight: 900,
                                            fontSize: '0.65rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5,
                                            borderRadius: '6px'
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Tooltip title="View Detailed Profile">
                                            <IconButton
                                                size="small"
                                                onClick={() => console.log('View', student.id)}
                                                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
                                            >
                                                <Visibility sx={{ fontSize: 20 }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Quick Actions">
                                            <IconButton
                                                size="small"
                                                onClick={() => console.log('More', student.id)}
                                                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
                                            >
                                                <MoreVert sx={{ fontSize: 20 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredStudents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    borderTop: `1px solid ${theme.palette.divider}`,
                    bgcolor: alpha(theme.palette.background.default, 0.4),
                }}
            />
        </Paper>
    );
};

export default StudentTable;
