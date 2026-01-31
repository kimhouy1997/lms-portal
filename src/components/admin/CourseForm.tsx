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
    alpha,
    useTheme,
    IconButton,
    Stack,
    FormHelperText
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

const courseSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    short_summary: z.string().optional(),
    level: z.enum([DifficultyLevel.BEGINNER, DifficultyLevel.INTERMEDIATE, DifficultyLevel.ADVANCED]),
    status: z.enum([CourseStatus.DRAFT, CourseStatus.PUBLISHED, CourseStatus.ARCHIVED]),
    price: z.number().min(0, 'Price must be 0 or more'),
    is_free: z.boolean(),
    thumbnail: z.string().optional(),
}).refine((data) => {
    if (!data.is_free && data.price <= 0) {
        return false;
    }
    return true;
}, {
    message: "Price must be greater than 0 for paid courses",
    path: ["price"],
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
    initialData?: Partial<Course>;
    onSubmit: (data: CourseFormData) => void;
    id?: string;
}

const CourseForm = ({ initialData, onSubmit, id = 'course-form' }: CourseFormProps) => {
    const theme = useTheme();

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: initialData?.title || '',
            short_summary: initialData?.short_summary || '',
            level: initialData?.level || DifficultyLevel.BEGINNER,
            status: initialData?.status || CourseStatus.DRAFT,
            price: initialData?.price || 0,
            is_free: initialData?.is_free || false,
            thumbnail: initialData?.thumbnail || '',
        }
    });

    const isFree = watch('is_free');
    const thumbnail = watch('thumbnail');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('thumbnail', reader.result as string, { shouldDirty: true });
            };
            reader.readAsDataURL(file);
        }
    }, [setValue]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    const handleRemoveThumbnail = (e: React.MouseEvent) => {
        e.stopPropagation();
        setValue('thumbnail', '', { shouldDirty: true });
    };

    return (
        <Box component="form" id={id} onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Grid container spacing={4}>
                {/* Left Side: Basic Info */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Course Title"
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
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
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="short_summary"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Short Summary"
                                        error={!!errors.short_summary}
                                        helperText={errors.short_summary?.message}
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
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth error={!!errors.level}>
                                <InputLabel>Difficulty Level</InputLabel>
                                <Controller
                                    name="level"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Difficulty Level"
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
                                    )}
                                />
                                {errors.level && <FormHelperText>{errors.level.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth error={!!errors.status}>
                                <InputLabel>Publishing Status</InputLabel>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Publishing Status"
                                            sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.background.paper, 0.5) }}
                                        >
                                            <MenuItem value={CourseStatus.DRAFT}>Draft</MenuItem>
                                            <MenuItem value={CourseStatus.PUBLISHED}>Published</MenuItem>
                                            <MenuItem value={CourseStatus.ARCHIVED}>Archived</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
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
                                    {thumbnail ? (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            style={{ width: '100%', height: '100%', position: 'absolute' }}
                                        >
                                            <Box
                                                component="img"
                                                src={thumbnail}
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
                                                    onClick={handleRemoveThumbnail}
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
                                    <Controller
                                        name="is_free"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                {...field}
                                                checked={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.checked);
                                                    if (e.target.checked) setValue('price', 0);
                                                }}
                                                color="secondary"
                                            />
                                        )}
                                    />
                                </Stack>

                                <AnimatePresence>
                                    {!isFree && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <Controller
                                                name="price"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        type="number"
                                                        label="Price (USD)"
                                                        error={!!errors.price}
                                                        helperText={errors.price?.message}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                                                )}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CourseForm;
