import { Box, Typography, TextField, Button, Stack, Switch, FormControlLabel } from '@mui/material';
import { Save } from '@mui/icons-material';

export const TeachingProfileSection = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Teaching Profile</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                This information will be displayed publicly on your teacher profile.
            </Typography>

            <Stack spacing={3}>
                <TextField fullWidth label="Bio" multiline rows={4} placeholder="Tell students about yourself..." sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                <TextField fullWidth label="Expertise / Skills" placeholder="React, Node.js, UI Design..." sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                <TextField fullWidth label="LinkedIn / GitHub URL" placeholder="https://linkedin.com/in/username" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                <FormControlLabel control={<Switch defaultChecked />} label="Public profile visibility" />
                <Button variant="contained" startIcon={<Save />} sx={{ mt: 2, borderRadius: 2 }}>Save Teaching Profile</Button>
            </Stack>
        </Box>
    );
};

export const PayoutSection = () => (
    <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Payout & Earnings</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Manage how you receive your earnings.</Typography>
        <Typography variant="body1">Earnings balance: $0.00</Typography>
    </Box>
);

export const VerificationSection = () => (
    <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Verification Status</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Verify your identity and qualifications.</Typography>
        <Box sx={{ p: 4, border: '2px dashed #ccc', borderRadius: 4, textAlign: 'center' }}>
            <Typography variant="body1">Verification pending...</Typography>
        </Box>
    </Box>
);
