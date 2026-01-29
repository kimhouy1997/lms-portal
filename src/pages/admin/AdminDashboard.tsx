import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    Button,
    Stack,
    Avatar,
    Chip,
    useTheme,
    alpha,
    FormControl,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    MenuItem,
    TextField,
    InputAdornment,
    Select
} from '@mui/material';
import {
    Add,
    People,
    School,
    Warning,
    TrendingUp,
    TrendingDown,
    AssignmentInd,
    Assignment,
    CheckCircle,
    ErrorOutline,
    ArrowForward,
    CalendarMonth,
    Business,
    Dashboard,
    Settings,
    MoreVert,
    Event
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

// Types
type AlertType = 'error' | 'warning' | 'info';
type StatusColor = 'success' | 'error' | 'warning' | 'default';

// Mock Data
const KPI_DATA = [
    { title: 'Total Students', value: '1,280', color: '#3f51b5', icon: <People />, trend: '+12%', positive: true, statusColor: 'success' },
    { title: 'Total Teachers', value: '45', color: '#673ab7', icon: <AssignmentInd />, trend: '+3', positive: true, statusColor: 'success' },
    { title: 'Active Courses', value: '32', color: '#4caf50', icon: <School />, trend: 'Steady', positive: true, statusColor: 'success' },
    { title: 'Active Classes', value: '124', color: '#ff9800', icon: <Dashboard />, trend: '+8', positive: true, statusColor: 'success' },
    { title: 'Completion Rate', value: '78%', color: '#00bcd4', icon: <CheckCircle />, trend: '-2.5%', positive: false, statusColor: 'warning' },
    { title: 'At Risk Students', value: '12', color: '#f44336', icon: <ErrorOutline />, trend: '+4', positive: false, statusColor: 'error' },
];

const ALERTS: { message: string; type: AlertType; action: string }[] = [
    { message: '3 courses have no teacher assigned', type: 'error', action: 'Assign Teacher' },
    { message: '12 students marked as At Risk in Batch A', type: 'warning', action: 'Review' },
    { message: '8 classes have low completion rates (< 40%)', type: 'warning', action: 'Investigate' },
    { message: 'Teachers with overdue grading: Mr. Dara, Ms. Lina', type: 'info', action: 'Notify' },
];

const RECENT_ACTIVITY = [
    { action: 'New student enrolled', user: 'Sarah Doe', target: 'MERN Stack Bootcamp', time: '5 mins ago', icon: <People /> },
    { action: 'Course published', user: 'Admin', target: 'UX Design Fundamentals', time: '1 hour ago', icon: <CheckCircle /> },
    { action: 'Assignment graded', user: 'Mr. John', target: 'Web Development Batch A', time: '3 hours ago', icon: <Assignment /> },
    { action: 'New teacher account', user: 'Ms. Sophea', target: 'Mathematics Dept', time: 'Yesterday', icon: <AssignmentInd /> },
];

const COURSE_STATUS: { name: string; teacher: string; students: number; progress: number; status: string; statusColor: StatusColor }[] = [
    { name: 'Web Dev Batch A', teacher: 'Mr. Dara', students: 32, progress: 85, status: 'On Track', statusColor: 'success' },
    { name: 'Accounting 101', teacher: 'Ms. Lina', students: 28, progress: 42, status: 'Behind', statusColor: 'error' },
    { name: 'UI/UX Evening', teacher: 'Mr. Vutha', students: 20, progress: 68, status: 'On Track', statusColor: 'success' },
    { name: 'Data Science Q1', teacher: 'Unassigned', students: 15, progress: 12, status: 'Delayed', statusColor: 'warning' },
];

const AdminDashboard = () => {
    const theme = useTheme();
    const [academicYear, setAcademicYear] = useState('2025-2026');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    return (
        <Box sx={{ pb: 6, mt: -2 }}>
            {/* 1. Dashboard Header */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 3 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1.5, mb: 0.5 }}>
                        School Dashboard
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), px: 2, py: 0.8, borderRadius: 2 }}>
                            <Business sx={{ color: 'primary.main', fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontWeight: 800 }}>Global International School</Typography>
                        </Stack>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <Select
                                value={academicYear}
                                onChange={(e) => setAcademicYear(e.target.value as string)}
                                displayEmpty
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    bgcolor: alpha(theme.palette.secondary.main, 0.05)
                                }}
                            >
                                <MenuItem value="2024-2025">Academic Year: 2024–2025</MenuItem>
                                <MenuItem value="2025-2026">Academic Year: 2025–2026</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Stack direction="row" spacing={1} sx={{ bgcolor: alpha(theme.palette.divider, 0.05), p: 0.5, borderRadius: 3 }}>
                        <TextField
                            type="date"
                            size="small"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2.5,
                                    bgcolor: 'background.paper',
                                    '& fieldset': { border: 'none' },
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    width: 140
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Event sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', px: 0.5 }}>
                            <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary' }}>TO</Typography>
                        </Box>
                        <TextField
                            type="date"
                            size="small"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2.5,
                                    bgcolor: 'background.paper',
                                    '& fieldset': { border: 'none' },
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    width: 140
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Event sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1 }} />
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        sx={{ borderRadius: 3, fontWeight: 800, px: 2, height: 48, borderColor: alpha(theme.palette.divider, 0.2) }}
                    >
                        Create Course
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<Add />}
                        sx={{ borderRadius: 3, fontWeight: 800, px: 2, height: 48, bgcolor: alpha(theme.palette.secondary.main, 0.05) }}
                    >
                        Add Teacher
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        sx={{
                            borderRadius: 3,
                            fontWeight: 800,
                            px: 3,
                            height: 48,
                            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`
                        }}
                    >
                        Add Student
                    </Button>
                </Stack>
            </Box>

            {/* 2. Key Metrics (KPI Cards) */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                {KPI_DATA.map((kpi, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
                        <MotionCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            sx={{
                                p: 2.5,
                                borderRadius: 5,
                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: `0 12px 24px ${alpha(kpi.color, 0.15)}`,
                                    borderColor: alpha(kpi.color, 0.3)
                                }
                            }}
                        >
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Box sx={{ p: 1, borderRadius: 3, bgcolor: alpha(kpi.color, 0.1), color: kpi.color, display: 'flex' }}>
                                        {kpi.icon}
                                    </Box>
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        {kpi.positive ?
                                            <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} /> :
                                            <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
                                        }
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: kpi.positive ? 'success.main' : 'error.main' }}>
                                            {kpi.trend}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.2 }}>{kpi.value}</Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        {kpi.title}
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={70}
                                    sx={{
                                        height: 6,
                                        borderRadius: 3,
                                        bgcolor: alpha(kpi.color, 0.05),
                                        '& .MuiLinearProgress-bar': { bgcolor: kpi.color }
                                    }}
                                />
                            </Stack>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4}>
                {/* Left Side: Activity and Status */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    {/* 3. Enrollment & Learning Activity */}
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUp color="primary" /> System Oversight
                    </Typography>
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper sx={{ p: 3, borderRadius: 5, bgcolor: alpha(theme.palette.primary.main, 0.02), border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2.5 }}>Enrollment Summary</Typography>
                                <Stack spacing={3}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}><Add /></Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>New Students</Typography>
                                                <Typography variant="caption" color="text.secondary">This session (monthly)</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="h5" sx={{ fontWeight: 900, color: 'success.main' }}>+128</Typography>
                                    </Stack>
                                    <Divider />
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main' }}><MoreVert sx={{ transform: 'rotate(90deg)' }} /></Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>Inactive Students</Typography>
                                                <Typography variant="caption" color="text.secondary">Dropped out / Withdrawn</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="h5" sx={{ fontWeight: 900 }}>42</Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper sx={{ p: 3, borderRadius: 5, bgcolor: alpha(theme.palette.secondary.main, 0.02), border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2.5 }}>Learning Activity</Typography>
                                <Stack spacing={3}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: 'info.main' }}><CheckCircle /></Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>Lessons Completed</Typography>
                                                <Typography variant="caption" color="text.secondary">Tracked today</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="h5" sx={{ fontWeight: 900 }}>1,042</Typography>
                                    </Stack>
                                    <Divider />
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main' }}><Assignment /></Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>Submissions</Typography>
                                                <Typography variant="caption" color="text.secondary">Pending Review (Weekly)</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="h5" sx={{ fontWeight: 900 }}>384</Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* 4. Courses & Classes Status */}
                    <Box sx={{ mb: 6 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Courses & Classes Status</Typography>
                            <Button variant="text" endIcon={<ArrowForward />} sx={{ fontWeight: 800 }}>View All</Button>
                        </Stack>
                        <TableContainer component={Paper} sx={{ borderRadius: 5, border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, boxShadow: 'none' }}>
                            <Table>
                                <TableHead sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem' }}>Course / Batch</TableCell>
                                        <TableCell sx={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem' }}>Instructor</TableCell>
                                        <TableCell sx={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem' }} align="center">Students</TableCell>
                                        <TableCell sx={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {COURSE_STATUS.map((course, idx) => (
                                        <TableRow key={idx} hover sx={{ '&:last-child td': { border: 0 } }}>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 800 }}>{course.name}</Typography>
                                                <Box sx={{ width: '100%', mt: 0.5 }}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={course.progress}
                                                        sx={{ height: 4, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.65rem' }}>{course.teacher.charAt(0)}</Avatar>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{course.teacher}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" sx={{ fontWeight: 800 }}>{course.students}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={course.status}
                                                    size="small"
                                                    color={course.statusColor}
                                                    variant="outlined"
                                                    sx={{
                                                        fontWeight: 800,
                                                        borderRadius: 1.5,
                                                        bgcolor: alpha(theme.palette[course.statusColor].main, 0.05)
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>

                {/* Right Side: Alerts, Activity, Shortcuts */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    {/* 5. Alerts & Action Required */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Warning /> Action Required
                        </Typography>
                        <Stack spacing={2}>
                            {ALERTS.map((alert, idx) => (
                                <Paper
                                    key={idx}
                                    sx={{
                                        p: 2,
                                        borderRadius: 4,
                                        borderLeft: `6px solid ${theme.palette[alert.type].main}`,
                                        bgcolor: alpha(theme.palette[alert.type].main, 0.03)
                                    }}
                                >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Box sx={{ pr: 2 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>{alert.message}</Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>System identified priority issue</Typography>
                                        </Box>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color={alert.type}
                                            sx={{ borderRadius: 2, fontWeight: 900, minWidth: 100 }}
                                        >
                                            {alert.action}
                                        </Button>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    </Box>

                    {/* 6. Recent Activity */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Recent Activity</Typography>
                        <Paper sx={{ borderRadius: 5, border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, p: 2 }}>
                            <List disablePadding>
                                {RECENT_ACTIVITY.map((activity, idx) => (
                                    <ListItem
                                        key={idx}
                                        disablePadding
                                        sx={{
                                            mb: idx !== RECENT_ACTIVITY.length - 1 ? 2 : 0,
                                            pb: idx !== RECENT_ACTIVITY.length - 1 ? 2 : 0,
                                            borderBottom: idx !== RECENT_ACTIVITY.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none'
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                                                {activity.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography variant="body2" sx={{ fontWeight: 800 }}>{activity.action}</Typography>}
                                            secondary={
                                                <Box>
                                                    <Typography component="span" variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                        {activity.user} • {activity.target}
                                                    </Typography>
                                                    <Typography display="block" variant="caption" sx={{ fontWeight: 700, color: 'primary.main', mt: 0.2 }}>
                                                        {activity.time}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Box>

                    {/* 7. System Shortcuts */}
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Quick Management</Typography>
                        <Grid container spacing={2}>
                            {[
                                { title: 'Users', icon: <People />, color: '#3f51b5' },
                                { title: 'Courses', icon: <School />, color: '#4caf50' },
                                { title: 'Calendar', icon: <CalendarMonth />, color: '#ff9800' },
                                { title: 'Settings', icon: <Settings />, color: '#607d8b' },
                            ].map((link, idx) => (
                                <Grid size={{ xs: 6 }} key={idx}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={link.icon}
                                        sx={{
                                            height: 60,
                                            borderRadius: 3,
                                            fontWeight: 800,
                                            borderColor: alpha(link.color, 0.2),
                                            color: 'text.primary',
                                            '&:hover': {
                                                bgcolor: alpha(link.color, 0.05),
                                                borderColor: link.color
                                            }
                                        }}
                                    >
                                        {link.title}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
