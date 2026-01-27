import {
    Person,
    Security as SecurityIcon,
    Settings,
    Notifications,
    Work,
    Payments,
    Verified
} from '@mui/icons-material';
import SettingsLayout from '@/components/settings/SettingsLayout';
import ProfileSection from '@/components/settings/ProfileSection';
import SecuritySection from '@/components/settings/SecuritySection';
import PreferencesSection from '@/components/settings/PreferencesSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import { TeachingProfileSection, PayoutSection, VerificationSection } from '@/components/settings/TeacherSections';

const TeacherSettings = () => {
    const sections = [
        { id: 'profile', label: 'Profile', icon: <Person fontSize="small" />, component: <ProfileSection /> },
        { id: 'security', label: 'Security', icon: <SecurityIcon fontSize="small" />, component: <SecuritySection /> },
        { id: 'preferences', label: 'Preferences', icon: <Settings fontSize="small" />, component: <PreferencesSection /> },
        { id: 'notifications', label: 'Notifications', icon: <Notifications fontSize="small" />, component: <NotificationsSection /> },
        { id: 'teaching', label: 'Teaching Profile', icon: <Work fontSize="small" />, component: <TeachingProfileSection /> },
        { id: 'payout', label: 'Payout / Earnings', icon: <Payments fontSize="small" />, component: <PayoutSection /> },
        { id: 'verification', label: 'Verification', icon: <Verified fontSize="small" />, component: <VerificationSection /> },
    ];

    return <SettingsLayout title="Teacher Settings" sections={sections} />;
};

export default TeacherSettings;
