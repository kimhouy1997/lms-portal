import {
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  alpha,
  useTheme,
  Grid
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    console.log('Contact form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(t('contact_form.success'));
    reset();
  };

  return (
    <Paper sx={{
      p: { xs: 4, md: 6 },
      borderRadius: 6,
      bgcolor: 'background.paper',
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
    }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{t('contact_form.title')}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('contact_form.subtitle')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={t('contact_form.labels.name')}
                placeholder={t('contact_form.placeholders.name')}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={t('contact_form.labels.email')}
                placeholder={t('contact_form.placeholders.email')}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label={t('contact_form.labels.subject')}
            placeholder={t('contact_form.placeholders.subject')}
            {...register('subject')}
            error={!!errors.subject}
            helperText={errors.subject?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />

          <TextField
            fullWidth
            label={t('contact_form.labels.message')}
            placeholder={t('contact_form.placeholders.message')}
            multiline
            rows={4}
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            startIcon={<Send />}
            sx={{
              py: 2,
              borderRadius: 3,
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`
            }}
          >
            {isSubmitting ? t('contact_form.submitting') : t('contact_form.submit')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default ContactForm;
