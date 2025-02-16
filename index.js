// Title: Weather Info API (Node.js + Express)

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

app.use(express.json());

// Get weather by city name
app.get('/weather/:city', async (req, res) => {
    try {
        const city = req.params.city;
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Get weather by coordinates
app.get('/weather/coords', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude are required' });
        
        const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Get weather description only
app.get('/weather/:city/description', async (req, res) => {
    try {
        const city = req.params.city;
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        res.json({ description: response.data.weather[0].description });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Weather Info API is running on http://localhost:${port}`);
});
