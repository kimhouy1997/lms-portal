import { Box, Typography, Button, Paper, Stack, alpha, useTheme } from '@mui/material';
import { Download, EmojiEvents } from '@mui/icons-material';

export const CertificatesSection = () => {
    const theme = useTheme();

    const certificates = [
        { title: 'Full-Stack Web Development', date: 'Dec 15, 2025', id: 'CERT-12345' },
        { title: 'UI/UX Advanced Design', date: 'Nov 20, 2025', id: 'CERT-67890' },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>My Certificates</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                View and download your earned certificates.
            </Typography>

            <Stack spacing={3}>
                {certificates.map((cert) => (
                    <Paper key={cert.id} variant="outlined" sx={{ p: 3, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Box sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', p: 1.5, borderRadius: 3, display: 'flex' }}>
                                <EmojiEvents fontSize="large" />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{cert.title}</Typography>
                                <Typography variant="body2" color="text.secondary">Issued on {cert.date} • ID: {cert.id}</Typography>
                            </Box>
                        </Stack>
                        <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 2 }}>Download PDF</Button>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export const PaymentsSection = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Payments & Billing</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Manage your payment methods and view billing history.
            </Typography>

            {/* Placeholder for billing info */}
            <Stack spacing={4}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Billing History</Typography>
                    <Typography variant="body2" color="text.secondary">No payment history found.</Typography>
                </Box>
            </Stack>
        </Box>
    );
};
