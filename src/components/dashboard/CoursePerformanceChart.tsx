import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, alpha, useTheme } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CoursePerformanceChart = () => {
    const theme = useTheme();

    const data = {
        labels: ['Web Dev', 'Designer', 'Python', 'Marketing', 'Business', 'Cloud'],
        datasets: [
            {
                label: 'Avg. Progress %',
                data: [85, 72, 90, 65, 48, 82],
                backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                borderRadius: 6,
                hoverBackgroundColor: theme.palette.secondary.main,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { weight: 600 as const } }
            },
            y: {
                max: 100,
                beginAtZero: true,
                grid: { color: alpha(theme.palette.divider, 0.1) },
                ticks: { font: { weight: 600 as const } }
            }
        }
    };

    return (
        <Box sx={{ height: 300, width: '100%' }}>
            <Bar data={data} options={options} />
        </Box>
    );
};

export default CoursePerformanceChart;
