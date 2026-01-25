import { Container, Typography, Box } from '@mui/material';

const Courses = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 15 }}>
      <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 800 }}>
        All Courses
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Explore our wide range of professional courses. Full course library coming soon!
        </Typography>
      </Box>
    </Container>
  );
};

export default Courses;
