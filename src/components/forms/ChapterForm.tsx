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
    useTheme
} from '@mui/material';
import { Close, Save, Title, Description, Info } from '@mui/icons-material';
import { useState } from 'react';
import type { Chapter } from '@/types/adminCourse';
import { CourseStatus } from '@/types/adminCourse';

interface ChapterFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Chapter>) => void;
    initialData?: Partial<Chapter>;
    title?: string;
}

const ChapterForm = ({ open, onClose, onSubmit, initialData, title: modalTitle }: ChapterFormProps) => {
    const theme = useTheme();
    const [formData, setFormData] = useState<Partial<Chapter>>(initialData || {
        title: '',
        description: '',
        status: CourseStatus.DRAFT,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
            PaperProps={{
                sx: { borderRadius: 4, p: 1 }
            }}
        >
            <DialogTitle sx={{ fontWeight: 900, fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {modalTitle || (initialData?.id ? 'Edit Chapter' : 'Create New Chapter')}
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 3 }}>
                <Stack spacing={3}>
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Title fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Chapter Title</Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            name="title"
                            placeholder="e.g., Fundamentals of React Architecture"
                            value={formData.title}
                            onChange={handleChange}
                            inputProps={{ maxLength: 255 }}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Box>

                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Description fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Description</Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            name="description"
                            placeholder="What will students learn in this chapter?"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            inputProps={{ maxLength: 3000 }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', textAlign: 'right', fontWeight: 600 }}>
                            {formData.description?.length || 0}/3000 characters
                        </Typography>
                    </Box>

                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Info fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Publishing Status</Typography>
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
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 1 }}>
                <Button
                    onClick={onClose}
                    sx={{ borderRadius: 2.5, fontWeight: 700, px: 3 }}
                >
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
                    {initialData?.id ? 'Save Changes' : 'Create Chapter'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChapterForm;