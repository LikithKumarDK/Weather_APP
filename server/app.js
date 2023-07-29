const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

const port = process.env.PORT;
const API_KEY = process.env.WEATHER_HOST_KEY;
const URL = process.env.WEATHER_HOST_URL;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getWeatherInfo/all/', async (req, resp) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    let result;
    try {
        result = await axios.get(URL + "onecall?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=metric");
        resp.json(result.data);
    } catch (err) {
        console.error(`failed all api due to ${err.message}`);
    }
});

app.get('/getWeatherInfo/city/', async (req, resp) => {
    const city = req.query.city;
    let result;
    try {
        result = await axios.get(URL + "weather?q=" + city + "&appid=" + API_KEY + "&units=metric");
        resp.json(result.data);
    } catch (err) {
        console.error(`failed city api due to ${err.message}`);
    }

});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})