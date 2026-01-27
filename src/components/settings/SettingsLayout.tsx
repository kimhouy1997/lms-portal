import { useState, type ReactNode } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme,
    alpha,
    IconButton,
    Drawer,
    useMediaQuery,
    Breadcrumbs,
    Link
} from '@mui/material';
import { Menu as MenuIcon, ChevronRight } from '@mui/icons-material';

interface SettingsSection {
    id: string;
    label: string;
    icon: ReactNode;
    component: ReactNode;
}

interface SettingsLayoutProps {
    title: string;
    sections: SettingsSection[];
    activeTab?: string;
}

const SettingsLayout = ({ title, sections, activeTab }: SettingsLayoutProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeSectionId, setActiveSectionId] = useState(activeTab || sections[0].id);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

    const handleSectionChange = (id: string) => {
        setActiveSectionId(id);
        if (isMobile) setIsMobileDrawerOpen(false);
    };

    const SidebarContent = (
        <List sx={{ p: 2 }}>
            {sections.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                    <ListItem key={section.id} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            onClick={() => handleSectionChange(section.id)}
                            sx={{
                                borderRadius: 3,
                                py: 1.5,
                                bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                color: isActive ? 'primary.main' : 'text.secondary',
                                '&:hover': {
                                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.divider, 0.05),
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                {section.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={section.label}
                                primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
                            />
                            {isActive && !isMobile && <ChevronRight fontSize="small" />}
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header & Breadcrumbs */}
            <Box sx={{ mb: 4 }}>
                <Breadcrumbs sx={{ mb: 1 }}>
                    <Link underline="hover" color="inherit" href="#">Dashboard</Link>
                    <Typography color="text.primary">Settings</Typography>
                </Breadcrumbs>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isMobile && (
                        <IconButton onClick={() => setIsMobileDrawerOpen(true)} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>{title}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Sidebar Desktop */}
                {!isMobile && (
                    <Paper
                        elevation={0}
                        sx={{
                            width: 280,
                            flexShrink: 0,
                            borderRadius: 4,
                            height: 'fit-content',
                            border: `1px solid ${theme.palette.divider}`,
                            overflow: 'hidden'
                        }}
                    >
                        {SidebarContent}
                    </Paper>
                )}

                {/* Sidebar Mobile Drawer */}
                <Drawer
                    anchor="left"
                    open={isMobileDrawerOpen}
                    onClose={() => setIsMobileDrawerOpen(false)}
                    PaperProps={{ sx: { width: 280 } }}
                >
                    <Box sx={{ px: 3, py: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Settings</Typography>
                        <Divider sx={{ mb: 2 }} />
                        {SidebarContent}
                    </Box>
                </Drawer>

                {/* Content Area */}
                <Paper
                    elevation={0}
                    sx={{
                        flexGrow: 1,
                        borderRadius: 4,
                        p: { xs: 3, md: 5 },
                        border: `1px solid ${theme.palette.divider}`,
                        minHeight: 600
                    }}
                >
                    {activeSection.component}
                </Paper>
            </Box>
        </Container>
    );
};

export default SettingsLayout;
