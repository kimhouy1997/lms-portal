import {
    Box,
    Button,
    Typography,
    Stack,
    Chip,
    IconButton,
    Tooltip,
    useTheme,
    alpha,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    InputAdornment,
    TextField
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    Business,
    Save,
    Search,
    Close
} from '@mui/icons-material';
import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DataTable } from '@/components/common/DataTable';
import type { Column } from '@/components/common/DataTable';
import { FormInput } from '@/components/forms/FormInput';
import { FormSelect } from '@/components/forms/FormSelect';
import { useInstitutes } from '@/hooks/useInstitutes';
import type { InstituteInterface, CreateInstituteRequest } from '@/types/institute.type';

const instituteSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    slug: z.string().min(2, 'Slug must be at least 2 characters'),
    domain: z.string().optional(),
    contactEmail: z.string().email('Invalid email').optional().or(z.literal('')),
    contactPhone: z.string().optional(),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
    timezone: z.string().default('UTC'),
    language: z.string().default('en'),
    status: z.enum(['active', 'suspended']).default('active'),
});

interface InstituteFormData {
    name: string;
    slug: string;
    domain?: string;
    contactEmail?: string;
    contactPhone?: string;
    website?: string;
    timezone: string;
    language: string;
    status: 'active' | 'suspended';
}

const Institute = () => {
    const theme = useTheme();
    const { institutes, isFetching, handleCreate, handleUpdate, handleDelete, isCreating, isUpdating } = useInstitutes();

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { control, handleSubmit, reset, watch, setValue } = useForm<InstituteFormData>({
        resolver: zodResolver(instituteSchema) as any,
        defaultValues: {
            status: 'active',
            timezone: 'UTC',
            language: 'en'
        }
    });

    const nameValue = watch('name');

    useEffect(() => {
        if (nameValue && !editingId) {
            const slug = nameValue.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            setValue('slug', slug);
        }
    }, [nameValue, setValue, editingId]);

    const filteredInstitutes = useMemo(() => {
        if (!institutes) return [];
        return institutes.filter(inst =>
            inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inst.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (inst.domain && inst.domain.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [institutes, searchQuery]);

    const handleOpen = (institute?: InstituteInterface) => {
        if (institute) {
            setEditingId(institute.id);
            reset({
                name: institute.name,
                slug: institute.slug,
                domain: institute.domain || '',
                contactEmail: institute.contactEmail || '',
                contactPhone: institute.contactPhone || '',
                website: institute.website || '',
                timezone: institute.timezone || 'UTC',
                language: institute.language || 'en',
                status: institute.status,
            });
        } else {
            setEditingId(null);
            reset({
                name: '',
                slug: '',
                domain: '',
                contactEmail: '',
                contactPhone: '',
                website: '',
                timezone: 'UTC',
                language: 'en',
                status: 'active',
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
        reset();
    };

    const onSubmit = async (data: InstituteFormData) => {
        const success = editingId
            ? await handleUpdate({ id: editingId, ...data })
            : await handleCreate(data as CreateInstituteRequest);

        if (success) {
            handleClose();
        }
    };

    const columns: Column<InstituteInterface>[] = [
        {
            id: 'name',
            label: 'Institute Name',
            format: (value, row) => (
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Business color="primary" />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {row.domain || 'No domain'}
                        </Typography>
                    </Box>
                </Stack>
            )
        },
        { id: 'slug', label: 'Slug / Code' },
        {
            id: 'status',
            label: 'Status',
            format: (value) => (
                <Chip
                    label={value === 'active' ? 'Active' : 'Suspended'}
                    color={value === 'active' ? 'success' : 'error'}
                    size="small"
                    sx={{ borderRadius: 1.5, fontWeight: 600 }}
                />
            )
        },
        { id: 'ownerName', label: 'Owner / Admin' },
        {
            id: 'totalDepartments',
            label: 'Depts',
            align: 'center',
            format: (value) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {value || 0}
                </Typography>
            )
        },
        {
            id: 'totalUsers',
            label: 'Users',
            align: 'center',
            format: (value) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {value || 0}
                </Typography>
            )
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'right',
            format: (_, row) => (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpen(row)}
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 4 }} spacing={2}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        Institutes
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your workspaces and institutes
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpen()}
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }}
                >
                    Add Institute
                </Button>
            </Stack>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by name, slug or domain..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 3, bgcolor: alpha(theme.palette.background.paper, 0.5) }
                    }}
                />
            </Box>

            <DataTable
                columns={columns}
                data={filteredInstitutes}
                isLoading={isFetching}
                totalCount={filteredInstitutes.length}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 5, p: 1 }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {editingId ? 'Edit Institute' : 'Add New Institute'}
                    <IconButton onClick={handleClose} size="small">
                        <Close />
                    </IconButton>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers sx={{ borderBottom: 'none' }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormInput
                                    name="name"
                                    control={control}
                                    label="Institute Name"
                                    placeholder="Global Academy"
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormInput
                                    name="slug"
                                    control={control}
                                    label="Code / Slug"
                                    placeholder="global-academy"
                                    required
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormInput
                                    name="domain"
                                    control={control}
                                    label="Custom Domain / Subdomain"
                                    placeholder="academy.example.com"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormSelect
                                    name="status"
                                    control={control}
                                    label="Status"
                                    options={[
                                        { value: 'active', label: 'Active' },
                                        { value: 'suspended', label: 'Suspended' },
                                    ]}
                                />
                            </Grid>

                            <Grid size={12}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, mt: 1 }}>
                                    Contact Information
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormInput
                                    name="contactEmail"
                                    control={control}
                                    label="Contact Email"
                                    placeholder="admin@academy.com"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormInput
                                    name="contactPhone"
                                    control={control}
                                    label="Contact Phone"
                                    placeholder="+1 234 567 890"
                                />
                            </Grid>
                            <Grid size={12}>
                                <FormInput
                                    name="website"
                                    control={control}
                                    label="Website URL"
                                    placeholder="https://academy.com"
                                />
                            </Grid>

                            <Grid size={12}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, mt: 1 }}>
                                    Regional Settings
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormSelect
                                    name="timezone"
                                    control={control}
                                    label="Timezone"
                                    options={[
                                        { value: 'UTC', label: 'UTC' },
                                        { value: 'Asia/Bangkok', label: 'Asia/Bangkok (GMT+7)' },
                                        { value: 'Asia/Phnom_Penh', label: 'Asia/Phnom Penh (GMT+7)' },
                                        { value: 'America/New_York', label: 'America/New York (GMT-5)' },
                                    ]}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormSelect
                                    name="language"
                                    control={control}
                                    label="Default Language"
                                    options={[
                                        { value: 'en', label: 'English' },
                                        { value: 'km', label: 'Khmer' },
                                    ]}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 1 }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<Save />}
                            loading={isCreating || isUpdating}
                            sx={{
                                borderRadius: 2,
                                px: 4,
                                textTransform: 'none',
                                fontWeight: 700,
                                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                            }}
                        >
                            {editingId ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default Institute;
