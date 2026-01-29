import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, useTheme, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const SystemDistributionChart = () => {
    const theme = useTheme();

    const data = {
        labels: ['Active', 'Inactive', 'At Risk'],
        datasets: [
            {
                data: [75, 18, 7],
                backgroundColor: [
                    theme.palette.primary.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                ],
                borderColor: theme.palette.background.paper,
                borderWidth: 4,
                hoverOffset: 10,
                cutout: '75%',
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: theme.palette.grey[900],
                padding: 12,
                cornerRadius: 8,
                titleFont: { weight: 'bold' as const },
            },
        },
    };

    return (
        <Box sx={{ height: 250, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Doughnut data={data} options={options} />
            </Box>
            <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>1,280</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>Students</Typography>
            </Box>
        </Box>
    );
};

export default SystemDistributionChart;
