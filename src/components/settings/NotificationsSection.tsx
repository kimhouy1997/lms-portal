import {
    Box,
    Typography,
    Stack,
    Divider,
    Switch,
    useTheme,
    Grid,
    alpha
} from '@mui/material';
import {
    Email,
    Sms,
    NotificationsActive,
    Campaign,
    Assignment,
    Message
} from '@mui/icons-material';

const NotificationsSection = () => {
    const theme = useTheme();

    const channels = [
        { label: 'Email Notifications', icon: <Email fontSize="small" />, default: true },
        { label: 'SMS Notifications', icon: <Sms fontSize="small" />, default: false },
        { label: 'Push Notifications', icon: <NotificationsActive fontSize="small" />, default: true },
        { label: 'In-app Notifications', icon: <Campaign fontSize="small" />, default: true },
    ];

    const categories = [
        { title: 'Course Updates', sub: 'Receive alerts when new content is added.', icon: <Campaign /> },
        { title: 'Deadlines & Reminders', sub: 'Don\'t miss assignment or exam due dates.', icon: <Assignment /> },
        { title: 'Direct Messages', sub: 'When someone sends you a personal message.', icon: <Message /> },
        { title: 'System Announcements', sub: 'Platform updates and maintenance news.', icon: <Campaign /> },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Notification Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Select how and when you want to be notified.
            </Typography>

            <Stack spacing={5}>
                {/* Notification Channels */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Notification Channels</Typography>
                    <Grid container spacing={3}>
                        {channels.map((channel, idx) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                                <Box sx={{
                                    p: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 3,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), p: 1, borderRadius: 2, display: 'flex' }}>
                                            {channel.icon}
                                        </Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{channel.label}</Typography>
                                    </Stack>
                                    <Switch defaultChecked={channel.default} size="small" />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider />

                {/* Categories */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Activity Preferences</Typography>
                    <Stack spacing={3}>
                        {categories.map((cat, idx) => (
                            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{cat.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{cat.sub}</Typography>
                                </Box>
                                <Switch defaultChecked />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default NotificationsSection;
