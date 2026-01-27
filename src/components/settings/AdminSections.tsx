import { Box, Typography, TextField, Button, Stack } from '@mui/material';

export const OrgSettingsSection = () => (
    <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Organization Settings</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Manage branding and identity.</Typography>
        <Stack spacing={3}>
            <TextField fullWidth label="Organization Name" defaultValue="LMS Portal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
            <TextField fullWidth label="Contact Email" defaultValue="admin@lmsportal.com" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
            <Button variant="contained" sx={{ borderRadius: 2 }}>Update Branding</Button>
        </Stack>
    </Box>
);

export const UserManagementSection = () => (
    <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>User Management</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Invite and manage platform users.</Typography>
        <Button variant="contained" sx={{ borderRadius: 2 }}>Invite New User</Button>
    </Box>
);

export const PermissionsSection = () => (
    <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Permissions & Roles</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Manage access control.</Typography>
        <Typography variant="body1">Coming soon...</Typography>
    </Box>
);

export const AdminBillingSection = () => (
    <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Billing & Plans</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Subscription and usage details.</Typography>
        <Typography variant="body1">Current Plan: Enterprise Free</Typography>
    </Box>
);

export const AuditLogsSection = () => (
    <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Audit Logs</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Track system events and actions.</Typography>
        <Typography variant="body1">No recent logs recorded.</Typography>
    </Box>
);
