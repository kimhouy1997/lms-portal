import { useCallback } from 'react';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    Switch,
    Box,
    Typography,
    type SelectChangeEvent,
    alpha,
    useTheme,
    IconButton,
    Stack
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import type { Course } from '@/types/adminCourse';
import { CourseStatus, DifficultyLevel } from '@/types/adminCourse';
import {
    AttachMoney,
    Description,
    Title,
    SignalCellularAlt,
    CloudUpload,
    Delete,
    PhotoSizeSelectActual
} from '@mui/icons-material';

interface CourseFormProps {
    formData: Partial<Course>;
    setFormData: (data: Partial<Course>) => void;
}

const CourseForm = ({ formData, setFormData }: CourseFormProps) => {
    const theme = useTheme();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, thumbnail: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    }, [formData, setFormData]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    const handleRemoveThumbnail = () => {
        setFormData({ ...formData, thumbnail: undefined });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setFormData({ ...formData, price: value });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleToggleFree = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isFree = e.target.checked;
        setFormData({
            ...formData,
            is_free: isFree,
            price: isFree ? 0 : formData.price || 0
        });
    };

    return (
        <Grid container spacing={4} sx={{ mt: 0 }}>
            {/* Left Side: Basic Info */}
            <Grid size={{ xs: 12, md: 7 }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Course Title"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleTextChange}
                            required
                            placeholder="e.g. Advanced TypeScript Mastery"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Title sx={{ color: 'primary.main', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 3, bgcolor: alpha(theme.palette.background.paper, 0.5) }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Short Summary"
                            name="short_summary"
                            value={formData.short_summary || ''}
                            onChange={handleTextChange}
                            placeholder="Briefly describe what students will learn..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                        <Description sx={{ color: 'primary.main', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 3, bgcolor: alpha(theme.palette.background.paper, 0.5) }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Difficulty Level</InputLabel>
                            <Select
                                label="Difficulty Level"
                                name="level"
                                value={formData.level || DifficultyLevel.BEGINNER}
                                onChange={handleSelectChange}
                                sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.background.paper, 0.5) }}
                                startAdornment={
                                    <InputAdornment position="start" sx={{ ml: 1 }}>
                                        <SignalCellularAlt sx={{ color: 'primary.main', fontSize: 20 }} />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value={DifficultyLevel.BEGINNER}>Beginner</MenuItem>
                                <MenuItem value={DifficultyLevel.INTERMEDIATE}>Intermediate</MenuItem>
                                <MenuItem value={DifficultyLevel.ADVANCED}>Advanced</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Publishing Status</InputLabel>
                            <Select
                                label="Publishing Status"
                                name="status"
                                value={formData.status || CourseStatus.DRAFT}
                                onChange={handleSelectChange}
                                sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.background.paper, 0.5) }}
                            >
                                <MenuItem value={CourseStatus.DRAFT}>Draft</MenuItem>
                                <MenuItem value={CourseStatus.PUBLISHED}>Published</MenuItem>
                                <MenuItem value={CourseStatus.ARCHIVED}>Archived</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

            {/* Right Side: Media & Pricing */}
            <Grid size={{ xs: 12, md: 5 }}>
                <Grid container spacing={3}>
                    {/* Thumbnail Drag & Drop */}
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhotoSizeSelectActual fontSize="small" color="primary" /> Course Thumbnail
                        </Typography>
                        <Box
                            {...getRootProps()}
                            sx={{
                                border: `2px dashed ${isDragActive ? theme.palette.primary.main : alpha(theme.palette.divider, 0.2)}`,
                                borderRadius: 5,
                                p: 1,
                                bgcolor: isDragActive ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.background.paper, 0.3),
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                minHeight: 180,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                                }
                            }}
                        >
                            <input {...getInputProps()} />
                            <AnimatePresence mode="wait">
                                {formData.thumbnail ? (
                                    <motion.div
                                        key="preview"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                                    >
                                        <Box
                                            component="img"
                                            src={formData.thumbnail}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: 4
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                zIndex: 2
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveThumbnail();
                                                }}
                                                sx={{
                                                    bgcolor: 'rgba(0,0,0,0.5)',
                                                    color: 'white',
                                                    backdropFilter: 'blur(4px)',
                                                    '&:hover': { bgcolor: 'rgba(255,0,0,0.7)' }
                                                }}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ textAlign: 'center' }}
                                    >
                                        <CloudUpload sx={{ fontSize: 40, color: 'text.disabled', mb: 1.5 }} />
                                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            {isDragActive ? 'Drop it here!' : 'Click or Drag Image'}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            PNG, JPG or WebP (Max 2MB)
                                        </Typography>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Grid>

                    {/* Pricing Section */}
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{
                            p: 2.5,
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.secondary.main, 0.03),
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                        }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Pricing Mode</Typography>
                                    <Typography variant="caption" color="text.secondary">Free or Paid</Typography>
                                </Box>
                                <Switch
                                    checked={formData.is_free || false}
                                    onChange={handleToggleFree}
                                    color="secondary"
                                />
                            </Stack>

                            <AnimatePresence>
                                {!formData.is_free && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Price (USD)"
                                            name="price"
                                            value={formData.price || ''}
                                            onChange={handlePriceChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoney sx={{ color: 'secondary.main', fontSize: 20 }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { borderRadius: 3, bgcolor: 'background.paper' }
                                            }}
                                            size="small"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CourseForm;
