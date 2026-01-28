import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import type { Student } from '../../pages/teacher/TeacherStudent';

interface StudentFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    newStudent: Partial<Student>;
    setNewStudent: (student: Partial<Student>) => void;
}

const StudentForm = ({ open, onClose, onSubmit, newStudent, setNewStudent }: StudentFormProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { borderRadius: 4, width: '100%', maxWidth: 500, p: 1 }
            }}
        >
            <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>Add New Student</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Input the details of the student to add them to your database.
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            placeholder="e.g. John Doe"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            placeholder="john@example.com"
                            type="email"
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            placeholder="+1 234 567 890"
                            value={newStudent.phone}
                            onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                            <InputLabel>Initial Status</InputLabel>
                            <Select
                                label="Initial Status"
                                value={newStudent.status}
                                onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value as string })}
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                                <MenuItem value="At Risk">At Risk</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 700 }}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={!newStudent.name || !newStudent.email}
                    sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
                >
                    Create Student
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StudentForm;
