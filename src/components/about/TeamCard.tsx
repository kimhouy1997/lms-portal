import { 
  Typography, 
  Avatar, 
  Stack, 
  IconButton, 
  Paper, 
  alpha, 
  useTheme 
} from '@mui/material';
import { LinkedIn, Twitter, GitHub, Telegram } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    telegram?: string;
  };
}

const TeamCard = ({ name, role, image, bio, socials }: TeamMemberProps) => {
  const theme = useTheme();

  return (
    <MotionPaper
      whileHover={{ y: -10 }}
      sx={{ 
        p: 4, 
        textAlign: 'center', 
        borderRadius: 6, 
        height: '100%',
        bgcolor: 'background.paper',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.1)}`
        }
      }}
    >
      <Avatar 
        src={image} 
        sx={{ 
          width: 120, 
          height: 120, 
          mx: 'auto', 
          mb: 3,
          border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`
        }} 
      />
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{name}</Typography>
      <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 2 }}>{role}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
        {bio}
      </Typography>
      
      <Stack direction="row" spacing={1} justifyContent="center">
        {socials.linkedin && (
          <IconButton size="small" component="a" href={socials.linkedin} target="_blank" color="primary">
            <LinkedIn fontSize="small" />
          </IconButton>
        )}
        {socials.twitter && (
          <IconButton size="small" component="a" href={socials.twitter} target="_blank" color="primary">
            <Twitter fontSize="small" />
          </IconButton>
        )}
        {socials.github && (
          <IconButton size="small" component="a" href={socials.github} target="_blank" color="primary">
            <GitHub fontSize="small" />
          </IconButton>
        )}
        {socials.telegram && (
          <IconButton size="small" component="a" href={socials.telegram} target="_blank" color="primary">
            <Telegram fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </MotionPaper>
  );
};

export default TeamCard;
