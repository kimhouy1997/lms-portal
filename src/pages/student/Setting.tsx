import {
    Person,
    Security as SecurityIcon,
    Settings,
    Notifications,
    EmojiEvents,
    AccountBalanceWallet
} from '@mui/icons-material';
import SettingsLayout from '@/components/settings/SettingsLayout';
import ProfileSection from '@/components/settings/ProfileSection';
import SecuritySection from '@/components/settings/SecuritySection';
import PreferencesSection from '@/components/settings/PreferencesSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import { CertificatesSection, PaymentsSection } from '@/components/settings/StudentSections';

const StudentSettings = () => {
    const sections = [
        { id: 'profile', label: 'Profile', icon: <Person fontSize="small" />, component: <ProfileSection /> },
        { id: 'security', label: 'Security', icon: <SecurityIcon fontSize="small" />, component: <SecuritySection /> },
        { id: 'preferences', label: 'Preferences', icon: <Settings fontSize="small" />, component: <PreferencesSection /> },
        { id: 'notifications', label: 'Notifications', icon: <Notifications fontSize="small" />, component: <NotificationsSection /> },
        { id: 'certificates', label: 'Certificates', icon: <EmojiEvents fontSize="small" />, component: <CertificatesSection /> },
        { id: 'payments', label: 'Payments', icon: <AccountBalanceWallet fontSize="small" />, component: <PaymentsSection /> },
    ];

    return <SettingsLayout title="Account Settings" sections={sections} />;
};

export default StudentSettings;
