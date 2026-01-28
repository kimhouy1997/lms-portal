import {
    Box,
    Typography,
    Stack,
    Avatar,
    Chip,
    useTheme,
    alpha,
    Tooltip,
    Paper
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarQuickFilter
} from '@mui/x-data-grid';
import {
    Visibility,
    TrendingUp,
    FilterList,
    MoreVert
} from '@mui/icons-material';
import type { Student } from '../../pages/teacher/TeacherStudent';

interface StudentTableProps {
    students: Student[];
}

const StudentTable = ({ students }: StudentTableProps) => {
    const theme = useTheme();

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Student Name',
            flex: 1.5,
            minWidth: 250,
            renderCell: (params) => (
                <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
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
                        {params.value?.charAt(0) || 'S'}
                    </Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }} noWrap>
                            {params.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            ID: #{params.id?.toString().padStart(4, '0')}
                        </Typography>
                    </Box>
                </Stack>
            ),
        },
        {
            field: 'email',
            headerName: 'Email Address',
            flex: 1.2,
            minWidth: 200,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'progress',
            headerName: 'Overall Progress',
            flex: 1.2,
            minWidth: 180,
            renderCell: (params) => (
                <Box sx={{ width: '100%', pr: 2 }}>
                    <Stack direction="row" justifyContent="space-between" mb={0.75} alignItems="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <TrendingUp sx={{ fontSize: 14, color: (params.value as number) > 80 ? 'success.main' : (params.value as number) < 40 ? 'error.main' : 'primary.main' }} />
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary' }}>{params.value}%</Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ width: '100%', height: 8, bgcolor: alpha(theme.palette.divider, 0.5), borderRadius: 4, overflow: 'hidden' }}>
                        <Box sx={{
                            width: `${params.value}%`,
                            height: '100%',
                            bgcolor: (params.value as number) > 80 ? 'success.main' : (params.value as number) < 40 ? 'error.main' : 'primary.main',
                            borderRadius: 4
                        }} />
                    </Box>
                </Box>
            ),
        },
        {
            field: 'status',
            headerName: 'Student Status',
            width: 140,
            renderCell: (params) => {
                let color: 'success' | 'info' | 'warning' | 'error' | 'default' = 'default';
                switch (params.value) {
                    case 'Active': color = 'success'; break;
                    case 'Completed': color = 'info'; break;
                    case 'At Risk': color = 'error'; break;
                    case 'Inactive': color = 'warning'; break;
                }
                return (
                    <Chip
                        label={params.value as string}
                        size="small"
                        color={color}
                        variant="outlined"
                        sx={{
                            fontWeight: 900,
                            fontSize: '0.65rem',
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            borderRadius: '6px'
                        }}
                    />
                );
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Management',
            width: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    key="view"
                    icon={<Tooltip title="View Detailed Profile"><Visibility sx={{ fontSize: 20 }} /></Tooltip>}
                    label="View"
                    onClick={() => console.log('View', params.id)}
                />,
                <GridActionsCellItem
                    key="more"
                    icon={<Tooltip title="Quick Actions"><MoreVert sx={{ fontSize: 20 }} /></Tooltip>}
                    label="More"
                    onClick={() => console.log('More', params.id)}
                />,
            ],
        },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ p: 2.5, borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flexGrow: 1, maxWidth: 450 }}>
                    <GridToolbarQuickFilter
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-root': {
                                bgcolor: alpha(theme.palette.background.default, 0.5),
                                borderRadius: 3,
                                px: 1,
                                height: 42,
                                border: `1px solid ${theme.palette.divider}`,
                                '&:hover': { border: `1px solid ${theme.palette.primary.main}` },
                                '&.Mui-focused': { border: `1px solid ${theme.palette.primary.main}`, boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}` }
                            },
                        }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" spacing={1.5}>
                    <GridToolbarExport />
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
            </GridToolbarContainer>
        );
    }

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
            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={students}
                    columns={columns}
                    slots={{ toolbar: CustomToolbar }}
                    pageSizeOptions={[5, 10, 25]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    disableRowSelectionOnClick
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-columnHeader': {
                            bgcolor: alpha(theme.palette.background.default, 0.8),
                            color: 'text.secondary',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            fontSize: '0.7rem',
                            letterSpacing: 1.5,
                            height: 60,
                        },
                        '& .MuiDataGrid-cell': {
                            borderColor: alpha(theme.palette.divider, 0.5),
                            display: 'flex',
                            alignItems: 'center',
                            py: 1
                        },
                        '& .MuiDataGrid-row': {
                            transition: '0.2s',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.02),
                                transform: 'scale(1.002)',
                            }
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: `1px solid ${theme.palette.divider}`,
                            bgcolor: alpha(theme.palette.background.default, 0.4),
                        }
                    }}
                />
            </Box>
        </Paper>
    );
};

export default StudentTable;
