//function to collect covid data
async function fetchCovidData() {
    //try catch block to ensure that if an error occurs the program will not crash
    try {
        //requests data from the given api
        const response = await fetch('https://disease.sh/v3/covid-19/all');
        const data = await response.json();

        document.getElementById('cases').textContent = data.cases.toLocaleString(); //Total Cases
        document.getElementById('deaths').textContent = data.deaths.toLocaleString(); //Total Deaths
        document.getElementById('recovered').textContent = data.recovered.toLocaleString();//Total recoverd
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
//fetches data as soon as the page loads
fetchCovidData();