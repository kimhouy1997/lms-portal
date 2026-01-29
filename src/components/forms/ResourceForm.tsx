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
} from '@mui/material';
import { Close, Save, Title, Description, Link, Storage, Category } from '@mui/icons-material';
import { useState } from 'react';
import type { Resource } from '@/types/adminCourse';
import { ResourceType } from '@/types/adminCourse';

interface ResourceFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Resource>) => void;
    initialData?: Partial<Resource>;
    lessonTitle?: string;
}

const ResourceForm = ({ open, onClose, onSubmit, initialData, lessonTitle }: ResourceFormProps) => {
    const theme = useTheme();
    const [formData, setFormData] = useState<Partial<Resource>>(initialData || {
        title: '',
        type: ResourceType.TEXT,
        url: '',
        path: '',
        storage_provider: 'Local',
        description: '',
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
            PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
        >
            <DialogTitle sx={{ fontWeight: 900, fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    {initialData?.id ? 'Edit Resource' : 'Add Content Resource'}
                    {lessonTitle && (
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            for: {lessonTitle}
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
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Resource Title</Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            name="title"
                            placeholder="e.g., Deep Dive into React Hooks PDF"
                            value={formData.title}
                            onChange={handleChange}
                            inputProps={{ maxLength: 255 }}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Category fontSize="small" color="primary" />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Resource Type</Typography>
                            </Stack>
                            <TextField
                                select
                                fullWidth
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value={ResourceType.TEXT}>Text Article</MenuItem>
                                <MenuItem value={ResourceType.VIDEO}>Video Lesson</MenuItem>
                                <MenuItem value={ResourceType.PDF}>Downloadable PDF</MenuItem>
                                <MenuItem value={ResourceType.QUIZ}>Interactive Quiz</MenuItem>
                                <MenuItem value={ResourceType.ASSIGNMENT}>Assignment</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Storage fontSize="small" color="primary" />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Storage Provider</Typography>
                            </Stack>
                            <TextField
                                fullWidth
                                name="storage_provider"
                                value={formData.storage_provider}
                                onChange={handleChange}
                                placeholder="Local, AWS, Google Cloud..."
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Box>
                    </Stack>

                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Link fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>URL / Link</Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            name="url"
                            placeholder="https://..."
                            value={formData.url}
                            onChange={handleChange}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Box>

                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Storage fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Internal File Path</Typography>
                        </Stack>
                        <TextField
                            fullWidth
                            name="path"
                            placeholder="/uploads/resources/..."
                            value={formData.path}
                            onChange={handleChange}
                            inputProps={{ maxLength: 500 }}
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
                            placeholder="Briefly describe this resource..."
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            inputProps={{ maxLength: 2000 }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                    </Box>
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
                    {initialData?.id ? 'Save Changes' : 'Add Resource'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResourceForm;
