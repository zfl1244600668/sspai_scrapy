const updateInterval = 1000;

function updateChart(chart, chartType) {
    fetch('/api/articles')
        .then(response => response.json())
        .then(data => {
            const titles = data.map(article => article.title);
            const chargeCounts = data.map(article => article.charge_count);
            const commentCounts = data.map(article => article.comment_count);

            chart.data.labels = titles;

            if (chartType === 'dualLine' || chartType === 'dualAxis') {
                chart.data.datasets[0].data = chargeCounts;
                chart.data.datasets[1].data = commentCounts;
            } else if (chartType === 'scatter') {
                chart.data.datasets[0].data = data.map(article => ({
                    x: article.charge_count,
                    y: article.comment_count
                }));
            } else {
                chart.data.datasets[0].data = chargeCounts;
                chart.data.datasets[1].data = commentCounts;
            }

            chart.update();
        });
}

function createChart(ctx, chartType) {
    let config;
    const chartContainer = document.querySelector('.chart-container');
    if (chartType === 'radar') {
        chartContainer.style.width = '130%';
        chartContainer.style.height = '130%';
    } else {
        chartContainer.style.width = '80%';
        chartContainer.style.height = '80%';
    }

    switch (chartType) {
        case 'stackedBar':
            config = {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Charge Count',
                            data: [],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Comment Count',
                            data: [],
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {stacked: true},
                        y: {beginAtZero: true, stacked: true}
                    }
                }
            };
            break;
        case 'dualLine':
            config = {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Charge Count',
                            data: [],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: 'Comment Count',
                            data: [],
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {beginAtZero: true}
                    }
                }
            };
            break;
        case 'scatter':
            config = {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: 'Articles',
                            data: [],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)'
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Charge Count'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Comment Count'
                            }
                        }
                    }
                }
            };
            break;


        case 'stackedArea':
            config = {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Charge Count',
                            data: [],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: true
                        },
                        {
                            label: 'Comment Count',
                            data: [],
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            fill: true
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {beginAtZero: true}
                    }
                }
            };
            break;
        case 'dualAxis':
            config = {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Charge Count',
                            data: [],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Comment Count',
                            data: [],
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            type: 'line',
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {beginAtZero: true, position: 'left'},
                        y1: {beginAtZero: true, position: 'right'}
                    }
                }
            };
            break;
        case 'radar':
            config = {
                type: 'radar',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Charge Count',
                            data: [],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Comment Count',
                            data: [],
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        r: {beginAtZero: true}
                    }
                }
            };
            break;

        default:
            break;
    }

    return new Chart(ctx, config);
}

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('articlesChart').getContext('2d');
    let currentChart = createChart(ctx, 'stackedBar');

    document.querySelectorAll('button.chart-switch').forEach(button => {
        button.addEventListener('click', function () {
            currentChart.destroy();
            const chartType = this.getAttribute('data-chart-type');
            currentChart = createChart(ctx, chartType);
            updateChart(currentChart, chartType);
        });
    });

    setInterval(() => updateChart(currentChart, 'stackedBar'), updateInterval);
});
