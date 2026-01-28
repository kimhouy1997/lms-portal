import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    useTheme,
    alpha
} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { motion } from 'framer-motion';
import StudentTable from '../../components/tables/StudentTable';
import StudentForm from '../../components/forms/StudentForm';

const MotionBox = motion(Box);

// Mock Data
const initialStudents = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234 567 890', progress: 85, status: 'Active', enrollmentDate: '2025-09-12', courses: 3 },
    { id: 2, name: 'Sarah Smith', email: 'sarah.s@example.com', phone: '+1 345 678 901', progress: 45, status: 'Active', enrollmentDate: '2025-10-05', courses: 2 },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@example.com', phone: '+1 456 789 012', progress: 92, status: 'Completed', enrollmentDate: '2025-08-20', courses: 5 },
    { id: 4, name: 'Elena Ross', email: 'elena.ross@example.com', phone: '+1 567 890 123', progress: 12, status: 'At Risk', enrollmentDate: '2026-01-15', courses: 1 },
    { id: 5, name: 'David Lee', email: 'david.lee@example.com', phone: '+1 678 901 234', progress: 68, status: 'Active', enrollmentDate: '2025-11-20', courses: 3 },
    { id: 6, name: 'Lisa Wang', email: 'lisa.w@example.com', phone: '+1 789 012 345', progress: 30, status: 'Inactive', enrollmentDate: '2025-12-01', courses: 2 },
    { id: 7, name: 'Kevin Brown', email: 'kevin.b@example.com', phone: '+1 890 123 456', progress: 77, status: 'Active', enrollmentDate: '2025-09-28', courses: 4 },
];

export interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    progress: number;
    status: string;
    enrollmentDate: string;
    courses: number;
}

const TeacherStudent = () => {
    const theme = useTheme();
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [open, setOpen] = useState(false);
    const [newStudent, setNewStudent] = useState<Partial<Student>>({ name: '', email: '', phone: '', status: 'Active' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateStudent = () => {
        const id = students.length + 1;
        const student: Student = {
            id,
            name: newStudent.name || '',
            email: newStudent.email || '',
            phone: newStudent.phone || '',
            status: newStudent.status || 'Active',
            progress: 0,
            enrollmentDate: new Date().toISOString().split('T')[0],
            courses: 0
        };
        setStudents([...students, student]);
        setNewStudent({ name: '', email: '', phone: '', status: 'Active' });
        handleClose();
    };

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ pb: 6 }}
        >
            {/* Header Area */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1.5, mb: 1, color: 'text.primary' }}>
                        Student Directory
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, opacity: 0.8 }}>
                        Manage and track the performance of {students.length} students enrolled in your current classes.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    onClick={handleOpen}
                    sx={{
                        borderRadius: 3.5,
                        px: 4,
                        py: 1.5,
                        fontWeight: 800,
                        height: 54,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 25px ${alpha(theme.palette.primary.main, 0.4)}` }
                    }}
                >
                    Add New Student
                </Button>
            </Box>

            {/* Students Table Component */}
            <StudentTable students={students} />

            {/* Student Creation Form Modal */}
            <StudentForm
                open={open}
                onClose={handleClose}
                onSubmit={handleCreateStudent}
                newStudent={newStudent}
                setNewStudent={setNewStudent}
            />
        </MotionBox>
    );
};

export default TeacherStudent;