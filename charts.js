//fuction to colect and process the data
async function fetchCovidChartData() {
    try {
        //sends a request to the disease.sh API to get the last 30 days of global COVID-19 statistics
        const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30');
        const data = await response.json();

        //Convert data into usable format
        const dates = Object.keys(data.cases);
        const cases = Object.values(data.cases);
        const deaths = Object.values(data.deaths);

        //Render Cases Chart
        //find <canvas> element with id="casesChart"
        const ctxCases = document.getElementById('casesChart').getContext('2d');
        new Chart(ctxCases, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Daily COVID-19 Cases',
                    data: cases,
                    borderColor: 'blue',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Date" }}, //Dates(last 30 days)
                    y: { title: { display: true, text: "Cases" }} //COVID-19 cases
                }
            }
        });

        //Render Deaths Chart
        //find <canvas> element with id="deathsChart"
        const ctxDeaths = document.getElementById('deathsChart').getContext('2d');
        //creates a Chart.js bar chart
        new Chart(ctxDeaths, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Daily COVID-19 Deaths',
                    data: deaths,
                    backgroundColor: 'red'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Date" }}, //Dates(Last 30 days)
                    y: { title: { display: true, text: "Deaths" }} //Deaths
                }
            }
        });
        //logs error if api fails
    } catch (error) {
        console.error("Error fetching COVID-19 data:", error);
    }
}

fetchCovidChartData();