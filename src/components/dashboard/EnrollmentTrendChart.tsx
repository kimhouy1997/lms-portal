import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, alpha, useTheme } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface EnrollmentTrendChartProps {
    data?: number[];
    labels?: string[];
}

const EnrollmentTrendChart = ({
    data = [45, 52, 48, 70, 65, 80, 95, 110, 100, 128, 115, 140],
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}: EnrollmentTrendChartProps) => {
    const theme = useTheme();

    const chartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'New Enrollments',
                data: data,
                borderColor: theme.palette.primary.main,
                backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, alpha(theme.palette.primary.main, 0.3));
                    gradient.addColorStop(1, alpha(theme.palette.primary.main, 0));
                    return gradient;
                },
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: theme.palette.primary.main,
                pointBorderColor: theme.palette.background.paper,
                pointBorderWidth: 2,
                pointHoverRadius: 6,
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
                backgroundColor: alpha(theme.palette.grey[900], 0.9),
                titleFont: { size: 14, weight: 'bold' as const },
                bodyFont: { size: 13 },
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: theme.palette.text.secondary,
                    font: { size: 12, weight: 600 as const },
                },
            },
            y: {
                grid: {
                    color: alpha(theme.palette.divider, 0.1),
                    drawBorder: false,
                },
                ticks: {
                    color: theme.palette.text.secondary,
                    font: { size: 12, weight: 600 as const },
                },
            },
        },
    };

    return (
        <Box sx={{ height: 300, width: '100%', pt: 2 }}>
            <Line data={chartData} options={options} />
        </Box>
    );
};

export default EnrollmentTrendChart;
