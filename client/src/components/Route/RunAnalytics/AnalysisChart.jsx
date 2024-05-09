import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnalysisChart = ({ data, name }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Initialize Chart.js instance
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: name,
                    data: data.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Cleanup on unmount
        return () => {
            myChart.destroy();
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default AnalysisChart;