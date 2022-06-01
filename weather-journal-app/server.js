// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Configure express to use body-parser as middle-ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const listening = () => {
    console.log('server is running on port ' + port)
};
const server = app.listen(port, listening);

// Create an empty array to store entries
const entries = [];

// Create a POST route to update the entries array
app.post('/addEntry', addEntry);

function addEntry (req, res) {
    entries.push(req.body);
};

// Create a GET route to send stored entries to the website
app.get('/getEntries', getEntries);

function getEntries (req, res) {
    res.send(entries);
};