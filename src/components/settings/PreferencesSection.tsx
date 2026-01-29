import {
    Box,
    Typography,
    Stack,
    Divider,
    Switch,
    FormControlLabel,
    RadioGroup,
    Radio,
    MenuItem,
    TextField
} from '@mui/material';
import {
    Palette,
    Dashboard,
    DateRange,
    Accessibility
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setThemeMode } from '@/redux/slices/appSlice';

const PreferencesSection = () => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector((state) => state.app.themeMode);

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Account Preferences</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Customize your experience within the LMS portal.
            </Typography>

            <Stack spacing={4}>
                {/* Theme Preference */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Palette color="primary" fontSize="small" /> Appearance & Theme
                    </Typography>
                    <RadioGroup
                        row
                        value={themeMode}
                        onChange={(e) => dispatch(setThemeMode(e.target.value as 'light' | 'dark'))}
                    >
                        <FormControlLabel value="light" control={<Radio />} label="Light Mode" />
                        <FormControlLabel value="dark" control={<Radio />} label="Dark Mode" />
                        <FormControlLabel value="system" control={<Radio />} label="System Default" />
                    </RadioGroup>
                </Box>

                <Divider />

                {/* Home Dashboard */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Dashboard color="primary" fontSize="small" /> Default Dashboard
                    </Typography>
                    <TextField
                        select
                        fullWidth
                        defaultValue="courses"
                        size="small"
                        sx={{ maxWidth: 300, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    >
                        <MenuItem value="overview">Overview</MenuItem>
                        <MenuItem value="courses">Active Courses</MenuItem>
                        <MenuItem value="calendar">Calendar View</MenuItem>
                    </TextField>
                </Box>

                <Divider />

                {/* Date Format */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DateRange color="primary" fontSize="small" /> Date & Time Format
                    </Typography>
                    <RadioGroup row defaultValue="MM/DD/YYYY">
                        <FormControlLabel value="MM/DD/YYYY" control={<Radio />} label="MM/DD/YYYY" />
                        <FormControlLabel value="DD/MM/YYYY" control={<Radio />} label="DD/MM/YYYY" />
                        <FormControlLabel value="YYYY-MM-DD" control={<Radio />} label="YYYY-MM-DD" />
                    </RadioGroup>
                </Box>

                <Divider />

                {/* Accessibility */}
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Accessibility color="primary" fontSize="small" /> Accessibility
                    </Typography>
                    <Stack spacing={1}>
                        <FormControlLabel
                            control={<Switch />}
                            label={<Typography variant="body2">High Contrast Mode</Typography>}
                        />
                        <FormControlLabel
                            control={<Switch />}
                            label={<Typography variant="body2">Reduced Motion</Typography>}
                        />
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default PreferencesSection;
