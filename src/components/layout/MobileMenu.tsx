import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  ListItemIcon, 
  IconButton, 
  Typography, 
  Stack, 
  alpha, 
  useTheme,
  Divider,
  Button
} from '@mui/material';
import { 
  Close, 
  School, 
  Login, 
  Language 
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constant/routers';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; path: string; icon: React.ReactNode }[];
  onToggleLanguage: () => void;
  languageLabel: string;
}

const MobileMenu = ({ isOpen, onClose, navItems, onToggleLanguage, languageLabel }: MobileMenuProps) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 300,
          bgcolor: 'background.default',
          backgroundImage: 'none',
          p: 3
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <School sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>LMS Portal</Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ bgcolor: alpha(theme.palette.divider, 0.1) }}>
            <Close />
          </IconButton>
        </Stack>

        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={onClose}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    color: 'text.secondary',
                    '&.active': {
                      color: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem' }} 
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Divider sx={{ my: 4 }} />

        <Stack spacing={2} sx={{ mt: 'auto' }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Language />}
            onClick={() => {
              onToggleLanguage();
              onClose();
            }}
            sx={{ 
              py: 1.5, 
              borderRadius: 3, 
              fontWeight: 600,
              borderColor: alpha(theme.palette.divider, 0.2)
            }}
          >
            {languageLabel}
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={NavLink}
            to={`/${ROUTES.login}`}
            onClick={onClose}
            startIcon={<Login />}
            sx={{ py: 1.5, borderRadius: 3, fontWeight: 700 }}
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
