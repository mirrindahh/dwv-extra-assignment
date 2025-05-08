document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from Flask backend
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // Experience chart
            const experienceData = {
                labels: Object.keys(data.experience),
                values: Object.values(data.experience),
                type: 'pie'
            };

            // Working hours chart
            const hoursData = {
                x: Object.keys(data.working_hours),
                y: Object.values(data.working_hours),
                type: 'bar'
            };

            // Schedule chart
            const scheduleData = {
                labels: Object.keys(data.schedule),
                values: Object.values(data.schedule),
                type: 'pie'
            };

            // Render charts
            Plotly.newPlot('experience-chart', [experienceData], {
                title: 'Experience Requirements'
            });

            Plotly.newPlot('hours-chart', [hoursData], {
                title: 'Working Hours'
            });

            Plotly.newPlot('schedule-chart', [scheduleData], {
                title: 'Work Schedule Types'
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
