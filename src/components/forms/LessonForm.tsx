import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    MenuItem,
    Typography,
    IconButton,
    Box,
    alpha,
    useTheme,
    FormControlLabel,
    Switch
} from '@mui/material';
import { Close, Save, Title, Description, Info, VideoLibrary, Timer } from '@mui/icons-material';
import { useState } from 'react';
import type { Lesson } from '@/types/adminCourse';
import { CourseStatus } from '@/types/adminCourse';

interface LessonFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Lesson>) => void;
    initialData?: Partial<Lesson>;
    chapterTitle?: string;
}

const LessonForm = ({ open, onClose, onSubmit, initialData, chapterTitle }: LessonFormProps) => {
    const theme = useTheme();
    const [formData, setFormData] = useState<Partial<Lesson>>(initialData || {
        title: '',
        description: '',
        status: CourseStatus.DRAFT,
        video_url: '',
        duration: '',
        is_preview: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
        >
            <DialogTitle sx={{ fontWeight: 900, fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    {initialData?.id ? 'Edit Lesson' : 'Add New Lesson'}
                    {chapterTitle && (
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            to: {chapterTitle}
                        </Typography>
                    )}
                </Box>
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 3 }}>
                <Stack spacing={3}>
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Title fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Lesson Title</Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            name="title"
                            placeholder="e.g., Introduction to State Management"
                            value={formData.title}
                            onChange={handleChange}
                            inputProps={{ maxLength: 255 }}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Box>

                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <VideoLibrary fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Video URL</Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            name="video_url"
                            placeholder="https://youtube.com/..."
                            value={formData.video_url}
                            onChange={handleChange}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Timer fontSize="small" color="primary" />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Duration</Typography>
                            </Stack>
                            <TextField
                                fullWidth
                                name="duration"
                                placeholder="e.g., 12:45"
                                value={formData.duration}
                                onChange={handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Info fontSize="small" color="primary" />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Status</Typography>
                            </Stack>
                            <TextField
                                select
                                fullWidth
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value={CourseStatus.DRAFT}>Draft</MenuItem>
                                <MenuItem value={CourseStatus.PUBLISHED}>Published</MenuItem>
                                <MenuItem value={CourseStatus.ARCHIVED}>Archived</MenuItem>
                            </TextField>
                        </Box>
                    </Stack>

                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Description fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Description</Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            name="description"
                            placeholder="Briefly explain what this lesson covers..."
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            inputProps={{ maxLength: 3000 }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Box>

                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={formData.is_preview}
                                onChange={handleSwitchChange}
                                name="is_preview"
                            />
                        }
                        label={
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                                Enable Preview (Allow non-enrolled students to watch)
                            </Typography>
                        }
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 1 }}>
                <Button onClick={onClose} sx={{ borderRadius: 2.5, fontWeight: 700, px: 3 }}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    startIcon={<Save />}
                    disabled={!formData.title}
                    sx={{
                        borderRadius: 2.5,
                        fontWeight: 800,
                        px: 4,
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`
                    }}
                >
                    {initialData?.id ? 'Save Changes' : 'Add Lesson'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LessonForm;
