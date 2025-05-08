fetch('vacancies_final.json')
  .then(response => response.json())
  .then(data => {
    // Prepare data for the "Experience Required" pie chart
    const experienceCounts = data.reduce((acc, vacancy) => {
      const experience = vacancy.experience;
      acc[experience] = (acc[experience] || 0) + 1;
      return acc;
    }, {});

    const experienceLabels = Object.keys(experienceCounts);
    const experienceData = Object.values(experienceCounts);

    // Create "Experience Required" pie chart
    const experienceCtx = document.getElementById('experienceChart').getContext('2d');
    new Chart(experienceCtx, {
      type: 'pie',
      data: {
        labels: experienceLabels,
        datasets: [{
          data: experienceData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });

    // Prepare data for the "Work Schedule" pie chart
    const scheduleCounts = data.reduce((acc, vacancy) => {
      const schedule = vacancy.schedule[0];
      acc[schedule] = (acc[schedule] || 0) + 1;
      return acc;
    }, {});

    const scheduleLabels = Object.keys(scheduleCounts);
    const scheduleData = Object.values(scheduleCounts);

    // Create "Work Schedule" pie chart
    const scheduleCtx = document.getElementById('scheduleChart').getContext('2d');
    new Chart(scheduleCtx, {
      type: 'pie',
      data: {
        labels: scheduleLabels,
        datasets: [{
          data: scheduleData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });

    // Prepare data for the "Working Hours" bar chart
    const hoursCounts = data.reduce((acc, vacancy) => {
      vacancy.working_hours.forEach(hours => {
        acc[hours] = (acc[hours] || 0) + 1;
      });
      return acc;
    }, {});

    const hoursLabels = Object.keys(hoursCounts);
    const hoursData = Object.values(hoursCounts);

    // Create "Working Hours" bar chart
    const hoursCtx = document.getElementById('workingHoursChart').getContext('2d');
    new Chart(hoursCtx, {
      type: 'bar',
      data: {
        labels: hoursLabels,
        datasets: [{
          label: 'Working Hours',
          data: hoursData,
          backgroundColor: '#36A2EB'
        }]
      }
    });
  })
  .catch(error => console.error('Error loading data:', error));
