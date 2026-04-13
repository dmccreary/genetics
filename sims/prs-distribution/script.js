// Polygenic Risk Score Distribution
// Chart.js MicroSim

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Sample A', 'Sample B', 'Sample C'],
        datasets: [{
            label: 'Polygenic Risk Score Distribution',
            data: [10, 20, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }],
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Polygenic Risk Score Distribution — Under Development',
            },
        },
    },
});
