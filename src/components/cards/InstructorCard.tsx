import { Avatar, Grid, Paper, Stack, Typography, Box } from '@mui/material';
import { Verified } from '@mui/icons-material';

interface InstructorCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: string;
  students?: string;
}

const InstructorCard = ({ name, role, bio, image, experience, students = "50,000+" }: InstructorCardProps) => {
  return (
    <Paper sx={{ p: { xs: 4, md: 6 }, borderRadius: 6, bgcolor: 'background.paper' }}>
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <Avatar 
            src={image} 
            sx={{ width: '100%', height: 'auto', borderRadius: 4 }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {name}
            </Typography>
            <Verified color="primary" />
          </Stack>
          <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
            {role}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            {bio}
          </Typography>
          <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
            <Box>
              <Typography variant="h6" fontWeight={800}>{experience}</Typography>
              <Typography variant="caption" color="text.secondary">Industry Experience</Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800}>{students}</Typography>
              <Typography variant="caption" color="text.secondary">Students Taught</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InstructorCard;
