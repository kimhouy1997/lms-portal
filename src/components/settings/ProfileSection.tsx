import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Stack,
    Grid,
    IconButton,
    alpha,
    useTheme,
    MenuItem
} from '@mui/material';
import { PhotoCamera, Save, Cancel } from '@mui/icons-material';
import { useAppSelector } from '@/redux/hooks';

const ProfileSection = () => {
    const theme = useTheme();
    const { user } = useAppSelector((state) => state.auth);

    const languages = [
        { value: 'en', label: 'English' },
        { value: 'kh', label: 'Khmer' },
    ];

    const timezones = [
        { value: 'UTC+7', label: '(UTC+07:00) Phnom Penh' },
        { value: 'UTC+0', label: '(UTC+00:00) GMT' },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Profile Information</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Update your photo and personal details here.
            </Typography>

            <Stack spacing={4}>
                {/* Avatar Upload */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={user?.avatar}
                            sx={{ width: 100, height: 100, border: `4px solid ${alpha(theme.palette.primary.main, 0.1)}` }}
                        >
                            {user?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: -5,
                                right: -5,
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' }
                            }}
                            size="small"
                        >
                            <PhotoCamera fontSize="small" />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Your Profile Picture</Typography>
                        <Typography variant="caption" color="text.secondary">JPG, GIF or PNG. Max size of 2MB</Typography>
                    </Box>
                </Box>

                {/* Personal Details Form */}
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            defaultValue={user?.username}
                            placeholder="Enter your full name"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Username"
                            defaultValue={user?.username}
                            placeholder="Choose a username"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            defaultValue={user?.email}
                            disabled
                            helperText="Email cannot be changed directly for security reasons."
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            placeholder="+855 12 345 678"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Date of Birth"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Language"
                            defaultValue="en"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        >
                            {languages.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Timezone"
                            defaultValue="UTC+7"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        >
                            {timezones.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>

                <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button variant="outlined" startIcon={<Cancel />} sx={{ borderRadius: 2, fontWeight: 700 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" startIcon={<Save />} sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}>
                        Save Changes
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default ProfileSection;
