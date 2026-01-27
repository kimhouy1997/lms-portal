import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Divider,
    Switch,
    alpha,
    useTheme,
    Paper,
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    Grid
} from '@mui/material';
import {
    VpnKey,
    PhonelinkSetup,
    Devices,
    DeleteForever,
    ExitToApp
} from '@mui/icons-material';

const SecuritySection = () => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Security Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Manage your password, 2FA and active sessions.
            </Typography>

            <Stack spacing={5}>
                {/* Password Reset */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <VpnKey color="primary" fontSize="small" /> Change Password
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Current Password"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="password"
                                label="New Password"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Confirm New Password"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>Update Password</Button>
                        </Grid>
                    </Grid>
                </Box>

                <Divider />

                {/* 2FA Section */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhonelinkSetup color="primary" fontSize="small" /> Two-Factor Authentication
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Add an extra layer of security to your account.
                            </Typography>
                        </Box>
                        <Switch />
                    </Box>
                </Box>

                <Divider />

                {/* Active Sessions */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Devices color="primary" fontSize="small" /> Active Sessions
                    </Typography>
                    <Paper elevation={0} sx={{ bgcolor: alpha(theme.palette.divider, 0.05), borderRadius: 3, p: 1 }}>
                        <List disablePadding>
                            <ListItem secondaryAction={
                                <Button size="small" color="error" startIcon={<ExitToApp />}>Logout</Button>
                            }>
                                <ListItemIcon><Devices /></ListItemIcon>
                                <ListItemText
                                    primary="MacBook Pro - Phnom Penh, Cambodia"
                                    secondary="Chrome • Active now"
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                    <Button variant="text" color="error" sx={{ mt: 2, fontWeight: 700 }}>Logout of all other devices</Button>
                </Box>

                <Divider />

                {/* Account Deletion */}
                <Box sx={{ p: 3, border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`, bgcolor: alpha(theme.palette.error.main, 0.02), borderRadius: 4 }}>
                    <Typography variant="subtitle1" sx={{ color: 'error.main', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DeleteForever fontSize="small" /> Danger Zone
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Once you delete your account, there is no going back. Please be certain.
                    </Typography>
                    <Button variant="outlined" color="error" sx={{ borderRadius: 2, fontWeight: 700 }}>Deactivate Account</Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default SecuritySection;
