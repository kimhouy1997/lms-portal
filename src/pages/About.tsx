import { useTranslation } from 'react-i18next';
import { Typography, Container, Box, Paper } from '@mui/material';

const About = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          {t('about.title')}
        </Typography>
        
        <Paper sx={{ p: 6, mt: 4 }}>
          <Typography variant="h5" color="text.secondary" paragraph>
            {t('about.description')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            {t('powered_by')}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
