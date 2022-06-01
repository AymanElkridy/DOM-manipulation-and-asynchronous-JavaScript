# Weather-Journal App Project

An asynchronous web app that uses Web API and user data to dynamically update the UI. The project was to apply **four dynamic aspects**.

## 1. Creating a Server with GET and POST Routes

Created an instance of an app inside the "server.js" file, using "express", "body-parser", and "cors" packages. Added a GET route and a POST route, to send and recieve data, to and from the website.

## 2. Getting Temperature from OpenWeatherMap API

Using user input of ZIP code to get the current temperature for the current location from OpenWeatherMap API.

## 3. Reecording Temperature and User Input of Feelings in the Journal Server

Created a POST route to record user input along with retrieved temperature from OpenWeatherMap API in the created server.

## 4. Updating the UI with Recorded Entry

Showing the most recent entry in the journal in the entries holder.
