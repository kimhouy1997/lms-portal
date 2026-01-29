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
    Person,
    Email,
    Badge,
    VerifiedUser,
    AdminPanelSettings,
    School,
    SupportAgent,
    MoreVert
} from '@mui/icons-material';
import { DataTable, type Column } from '@/components/common/DataTable';

// Types & Enums
export const UserRole = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    ASSISTANT: 'assistant',
    STUDENT: 'student'
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];

export const UserStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending'
} as const;
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];

export interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatar?: string;
    lastLogin: string;
    joinedDate: string;
}

// Mock Data
const mockUsers: User[] = [
    {
        id: 1,
        username: 'admin_user',
        email: 'admin@lmsportal.com',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        lastLogin: '2026-01-28 10:30 AM',
        joinedDate: '2025-01-01'
    },
    {
        id: 2,
        username: 'john_teacher',
        email: 'john.t@lmsportal.com',
        role: UserRole.TEACHER,
        status: UserStatus.ACTIVE,
        lastLogin: '2026-01-29 08:15 AM',
        joinedDate: '2025-03-15'
    },
    {
        id: 3,
        username: 'sarah_student',
        email: 'sarah.s@example.com',
        role: UserRole.STUDENT,
        status: UserStatus.ACTIVE,
        lastLogin: '2026-01-27 04:45 PM',
        joinedDate: '2025-09-12'
    },
    {
        id: 4,
        username: 'mike_assistant',
        email: 'mike.a@lmsportal.com',
        role: UserRole.ASSISTANT,
        status: UserStatus.PENDING,
        lastLogin: 'Never',
        joinedDate: '2026-01-20'
    },
    {
        id: 5,
        username: 'jane_doe',
        email: 'jane.doe@example.com',
        role: UserRole.STUDENT,
        status: UserStatus.INACTIVE,
        lastLogin: '2025-12-01 02:00 PM',
        joinedDate: '2025-11-05'
    }
];

const UserManagement = () => {
    const theme = useTheme();
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    // Form state
    const [formData, setFormData] = useState<Partial<User>>({
        username: '',
        email: '',
        role: UserRole.STUDENT,
        status: UserStatus.PENDING
    });

    const handleOpenModal = (user?: User) => {
        if (user) {
            setEditingUser(user);
            setFormData(user);
        } else {
            setEditingUser(null);
            setFormData({
                username: '',
                email: '',
                role: UserRole.STUDENT,
                status: UserStatus.PENDING
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingUser(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleSubmit = () => {
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } as User : u));
        } else {
            const newUser: User = {
                ...formData,
                id: Math.max(...users.map(u => u.id), 0) + 1,
                lastLogin: 'Never',
                joinedDate: new Date().toISOString().split('T')[0],
            } as User;
            setUsers([newUser, ...users]);
        }
        handleCloseModal();
    };

    const getRoleIcon = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMIN: return <AdminPanelSettings sx={{ fontSize: 18 }} />;
            case UserRole.TEACHER: return <VerifiedUser sx={{ fontSize: 18 }} />;
            case UserRole.ASSISTANT: return <SupportAgent sx={{ fontSize: 18 }} />;
            case UserRole.STUDENT: return <School sx={{ fontSize: 18 }} />;
            default: return <Person sx={{ fontSize: 18 }} />;
        }
    };

    const getRoleColor = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMIN: return theme.palette.error.main;
            case UserRole.TEACHER: return theme.palette.primary.main;
            case UserRole.ASSISTANT: return theme.palette.info.main;
            case UserRole.STUDENT: return theme.palette.success.main;
            default: return theme.palette.grey[500];
        }
    };

    const columns: Column<User>[] = [
        {
            id: 'username',
            label: 'User Profile',
            minWidth: 250,
            format: (_, row) => (
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: alpha(getRoleColor(row.role), 0.1),
                            color: getRoleColor(row.role),
                            fontWeight: 800,
                            fontSize: '0.9rem'
                        }}
                    >
                        {row.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>
                            {row.username}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Email sx={{ fontSize: 12, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {row.email}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            )
        },
        {
            id: 'role',
            label: 'Role',
            minWidth: 150,
            format: (value) => (
                <Chip
                    icon={getRoleIcon(value as UserRole)}
                    label={String(value).toUpperCase()}
                    size="small"
                    sx={{
                        fontWeight: 900,
                        fontSize: '0.65rem',
                        borderRadius: 1.5,
                        bgcolor: alpha(getRoleColor(value as UserRole), 0.08),
                        color: getRoleColor(value as UserRole),
                        border: `1px solid ${alpha(getRoleColor(value as UserRole), 0.2)}`,
                        '& .MuiChip-icon': { color: 'inherit' }
                    }}
                />
            )
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 120,
            format: (value) => {
                const colors = {
                    [UserStatus.ACTIVE]: 'success',
                    [UserStatus.INACTIVE]: 'error',
                    [UserStatus.PENDING]: 'warning'
                } as const;
                return (
                    <Chip
                        label={String(value).toUpperCase()}
                        size="small"
                        color={colors[value as UserStatus]}
                        sx={{
                            fontWeight: 800,
                            fontSize: '0.65rem',
                            borderRadius: 1.5,
                            bgcolor: alpha(theme.palette[colors[value as UserStatus]].main, 0.1),
                            color: `${colors[value as UserStatus]}.main`,
                            border: 'none'
                        }}
                    />
                );
            }
        },
        {
            id: 'lastLogin',
            label: 'Last Session',
            minWidth: 180,
            format: (value) => (
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {value}
                </Typography>
            )
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'right',
            minWidth: 120,
            format: (_, row) => (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, row)}
                        sx={{
                            bgcolor: anchorEl && selectedUser?.id === row.id ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                            color: anchorEl && selectedUser?.id === row.id ? 'primary.main' : 'text.secondary',
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) }
                        }}
                    >
                        <MoreVert fontSize="small" />
                    </IconButton>
                </Stack>
            )
        }
    ];

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ pb: 6 }}>
            {/* Header Area */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1.5, mb: 1 }}>
                        User Directory
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, opacity: 0.8 }}>
                        Manage platform access, roles, and security permissions for all system users.
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
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.35)}` }
                    }}
                >
                    Create User
                </Button>
            </Box>

            {/* Toolbar */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    placeholder="Search by username or email..."
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ maxWidth: 400, flexGrow: 1 }}
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

            {/* Users DataTable */}
            <DataTable
                columns={columns}
                data={filteredUsers}
                totalCount={filteredUsers.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
            />

            {/* User Access Modal */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 6, p: 1 }
                }}
            >
                <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem', pb: 1 }}>
                    {editingUser ? 'Edit User Access' : 'Create System User'}
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {editingUser ? 'Modify profile and administrative permissions.' : 'Grant platform access to a new member.'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Username"
                                placeholder="e.g. john_doe"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Badge sx={{ fontSize: 20, color: 'text.disabled' }} /></InputAdornment>,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="E-mail Address"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Email sx={{ fontSize: 20, color: 'text.disabled' }} /></InputAdornment>,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Primary Role</InputLabel>
                                <Select
                                    label="Primary Role"
                                    value={formData.role}
                                    onChange={(e: SelectChangeEvent<UserRole>) => setFormData({ ...formData, role: e.target.value as UserRole })}
                                    sx={{ borderRadius: 3 }}
                                >
                                    <MenuItem value={UserRole.ADMIN}>Administrator</MenuItem>
                                    <MenuItem value={UserRole.TEACHER}>Instructor</MenuItem>
                                    <MenuItem value={UserRole.ASSISTANT}>Assistant</MenuItem>
                                    <MenuItem value={UserRole.STUDENT}>Student</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Account Status</InputLabel>
                                <Select
                                    label="Account Status"
                                    value={formData.status}
                                    onChange={(e: SelectChangeEvent<UserStatus>) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                                    sx={{ borderRadius: 3 }}
                                >
                                    <MenuItem value={UserStatus.ACTIVE}>Active</MenuItem>
                                    <MenuItem value={UserStatus.INACTIVE}>Inactive</MenuItem>
                                    <MenuItem value={UserStatus.PENDING}>Pending Approval</MenuItem>
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
                        disabled={!formData.username || !formData.email}
                        sx={{
                            borderRadius: 2.5,
                            px: 4,
                            fontWeight: 800,
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                    >
                        {editingUser ? 'Update Profile' : 'Confirm & Create'}
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
                <MenuItem onClick={() => { handleMenuClose(); /* View Profile logic */ }}>
                    <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
                    <ListItemText primary="View Profile" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedUser) handleOpenModal(selectedUser);
                    handleMenuClose();
                }}>
                    <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Edit Permissions" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
                <Divider sx={{ my: 1, opacity: 0.5 }} />
                <MenuItem
                    onClick={() => {
                        if (selectedUser) handleDelete(selectedUser.id);
                        handleMenuClose();
                    }}
                    sx={{ color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.05) + ' !important' } }}
                >
                    <ListItemIcon><Delete fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
                    <ListItemText primary="Delete User" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserManagement;