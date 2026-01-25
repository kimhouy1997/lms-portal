import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Stack, 
  alpha, 
  useTheme,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import { 
  Groups, 
  EmojiObjects, 
  RocketLaunch, 
  Public,
  Telegram,
  LinkedIn,
  Email,
  LocationOn
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { TeamCard, ContactForm } from '@/components/about';

const MotionBox = motion(Box);

const About = () => {
  const theme = useTheme();

  const teamMembers = [
    {
      name: "Sok Mean",
      role: "Founder & Lead Instructor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Full-stack architect with 10+ years of experience. Passionate about teaching modern web technologies to the next generation of developers in Cambodia.",
      socials: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        telegram: "https://t.me/sokmean"
      }
    },
    {
      name: "Sarah Johnson",
      role: "Co-Founder & UI/UX Expert",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      bio: "Design systems specialist who has worked with top Silicon Valley startups. Sarah ensures our students learn to build beautiful and functional interfaces.",
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    },
    {
      name: "David Kim",
      role: "Backend Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Cloud infrastructure enthusiast. David teaches students how to scale applications and manage complex database architectures effectively.",
      socials: {
        linkedin: "https://linkedin.com",
        telegram: "https://t.me/davidkim"
      }
    }
  ];

  const coreValues = [
    { 
      icon: <EmojiObjects color="primary" />, 
      title: "Quality Content", 
      desc: "We prioritize deep understanding over superficial learning. Our curriculum is updated constantly." 
    },
    { 
      icon: <Groups color="primary" />, 
      title: "Community First", 
      desc: "Learning is better together. We foster a supportive environment where students help each other." 
    },
    { 
      icon: <RocketLaunch color="primary" />, 
      title: "Career Focused", 
      desc: "Everything we teach is designed to help you get hired or start your own successful project." 
    },
    { 
      icon: <Public color="primary" />, 
      title: "Global Standards", 
      desc: "We bring international tech industry standards to the local market in Cambodia." 
    }
  ];

  return (
    <Box>
      {/* 1. Hero Section */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        pt: { xs: 10, md: 15 }, 
        pb: { xs: 8, md: 12 },
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '50%',
          height: '70%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(100px)',
          zIndex: 0
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>
                  OUR MISSION
                </Typography>
                <Typography variant="h1" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                  Empowering the next generation of <Box component="span" sx={{ color: 'primary.main' }}>Tech Leaders</Box>.
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
                  LMS Portal was founded with a single goal: to bridge the gap between academic education and industry demands. We provide cutting-edge web development training that transforms students into professionals.
                </Typography>
              </MotionBox>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box 
                  component="img" 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  sx={{ width: '100%', borderRadius: 8, boxShadow: '0 20px 80px rgba(0,0,0,0.3)' }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. Core Values */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
          What drives us forward
        </Typography>
        <Grid container spacing={4}>
          {coreValues.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper sx={{ 
                p: 4, 
                height: '100%', 
                borderRadius: 4, 
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                textAlign: 'center'
              }}>
                <Box sx={{ mb: 2, '& svg': { fontSize: 40 } }}>{value.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{value.title}</Typography>
                <Typography variant="body2" color="text.secondary">{value.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. Team Section */}
      <Box sx={{ py: 15, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 2, fontWeight: 800 }}>
            Meet our experts
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 10, maxWidth: 600, mx: 'auto' }}>
            Our instructors are industry veterans committed to your success.
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <TeamCard {...member} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Contact Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
              Let's build something <Box component="span" sx={{ color: 'primary.main' }}>amazing</Box> together.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.1rem' }}>
              Whether you're a potential student, a hiring partner, or just want to say hi, we're here for you.
            </Typography>

            <Stack spacing={4}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                  <Email />
                </Paper>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>Email us</Typography>
                  <Typography variant="body1" color="text.secondary">hello@lmsportal.com</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 3 }}>
                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                  <Telegram />
                </Paper>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>Telegram Channel</Typography>
                  <Typography variant="body1" color="text.secondary">@lmsportal_community</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 3 }}>
                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                  <LocationOn />
                </Paper>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>Our Location</Typography>
                  <Typography variant="body1" color="text.secondary">Phnom Penh, Cambodia</Typography>
                </Box>
              </Box>
            </Stack>

            <Divider sx={{ my: 6 }} />

            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>Follow us on social media</Typography>
            <Stack direction="row" spacing={2}>
              <IconButton color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}><LinkedIn /></IconButton>
              <IconButton color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}><Telegram /></IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
