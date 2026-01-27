import { Box, Typography, useTheme } from '@mui/material';
import { School } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constant/routers';

interface LogoProps {
    sx?: any;
    fontSize?: number | string;
    iconSize?: number | string;
}

const Logo = ({ sx, fontSize = '1.5rem', iconSize = 32 }: LogoProps) => {
    const theme = useTheme();

    return (
        <Box
            component={Link}
            to={ROUTES.home}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                ...sx
            }}
        >
            <School sx={{ color: 'primary.main', fontSize: iconSize }} />
            <Typography variant="h6" sx={{
                fontWeight: 800,
                fontSize: fontSize,
                background: `linear-gradient(to right, ${theme.palette.mode === 'dark' ? '#fff' : '#000'}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
            }}>
                LMS Portal
            </Typography>
        </Box>
    );
};

export default Logo;
