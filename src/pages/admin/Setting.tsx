import {
    Person,
    Security as SecurityIcon,
    Settings,
    Notifications,
    Business,
    Group,
    AdminPanelSettings,
    Receipt,
    History
} from '@mui/icons-material';
import SettingsLayout from '@/components/settings/SettingsLayout';
import ProfileSection from '@/components/settings/ProfileSection';
import SecuritySection from '@/components/settings/SecuritySection';
import PreferencesSection from '@/components/settings/PreferencesSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import {
    OrgSettingsSection,
    UserManagementSection,
    PermissionsSection,
    AdminBillingSection,
    AuditLogsSection
} from '@/components/settings/AdminSections';

const AdminSettings = () => {
    const sections = [
        { id: 'profile', label: 'Profile', icon: <Person fontSize="small" />, component: <ProfileSection /> },
        { id: 'security', label: 'Security', icon: <SecurityIcon fontSize="small" />, component: <SecuritySection /> },
        { id: 'preferences', label: 'Preferences', icon: <Settings fontSize="small" />, component: <PreferencesSection /> },
        { id: 'notifications', label: 'Notifications', icon: <Notifications fontSize="small" />, component: <NotificationsSection /> },
        { id: 'organization', label: 'Organization Settings', icon: <Business fontSize="small" />, component: <OrgSettingsSection /> },
        { id: 'users', label: 'User Management', icon: <Group fontSize="small" />, component: <UserManagementSection /> },
        { id: 'permissions', label: 'Permissions & Roles', icon: <AdminPanelSettings fontSize="small" />, component: <PermissionsSection /> },
        { id: 'billing', label: 'Billing & Plans', icon: <Receipt fontSize="small" />, component: <AdminBillingSection /> },
        { id: 'logs', label: 'Audit Logs', icon: <History fontSize="small" />, component: <AuditLogsSection /> },
    ];

    return <SettingsLayout title="Administration Settings" sections={sections} />;
};

export default AdminSettings;
