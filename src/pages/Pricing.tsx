import { Container, Typography, Box } from '@mui/material';

const Pricing = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 15 }}>
      <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 800 }}>
        Pricing Plans
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Choose the plan that fits your learning journey. Pricing details coming soon!
        </Typography>
      </Box>
    </Container>
  );
};

export default Pricing;
