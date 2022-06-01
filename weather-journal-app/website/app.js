/* Global Variables */

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=d3430e06043339351796fd2e0e8f487c&units=metric';
const zipInput = document.getElementById('zip');

/* Functions */

// Event handler for clicking the 'Generate' button

const performAction = (event) => {
    getTemp(baseURL, zipInput.value, apiKey);
};

// Getting the temperature using zip code from OpenWeatherMap API

const getTemp = async (url, zip, key) => {
    try {
        const returnData = await fetch (url + zip + key);
        const data = await returnData.json();
        const d = new Date();
        const newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear(); // --------------------------------------------> Creaing a new date with the desired format (MM.DD.YYYY)
        postData('/addEntry', {date: newDate, temp: data.main.temp, content: document.getElementById('feelings').value}); // --> Posting date, temperature & feelings to our server
        getData('/getEntries'); // --------------------------------------------------------------------------------------------> Getting all the gathered data from our server
        zipInput.classList.remove('error'); // ---------------------------╮
        zipInput.setAttribute('placeholder', 'enter zip code here'); // --┴----------------------------------------------------> Non-erroneous input handling through changing the UI
    } catch (error) {
        console.log('error', error);
        zipInput.classList.add('error'); // ---------------------------------╮
        zipInput.setAttribute('placeholder', 'ENTER A VALID ZIP CODE'); // --┴-------------------------------------------------> Erroneous input handling through changing the UI
    }
};

// Posting the data to our server 

const postData = async (url, data) => {
    try {
        const entry = await fetch (url, {
            method: 'POST', 
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},      
            body: JSON.stringify(data), 
        });
    } catch (error) {
        console.log('error', error);
    }
};

// Getting the data from our server

const getData = async (url) => {
    try {
        const entries = await fetch (url);
        const gotData = await entries.json(); // --> Converting the data into JSON format to access it
        renderData(gotData); // -------------------> Changing the UI using the data retrieved from our server
    } catch (error) {
        console.log('error', error);
    }
};

// Rendering the most recent entry to the UI

const renderData = (data) => {
    const i = data.length - 1; // -----------------------------------------> Getting the last index in our server's data array
    document.getElementById('date').textContent = data[i].date; // --------> Accessing the 'date'        in the last element of our server's data array
    document.getElementById('temp').textContent = data[i].temp; // --------> Accessing the 'temperature' in the last element of our server's data array
    document.getElementById('content').textContent = data[i].content; // --> Accessing the 'feelings'    in the last element of our server's data array
};

// Adding an event listener to the 'Generate' button to get the meperature, post & get data, and change the UI

document.getElementById('generate').addEventListener('click', performAction);

// Initializing the UI with the most recent entry in our server's data array

getData('/getEntries');