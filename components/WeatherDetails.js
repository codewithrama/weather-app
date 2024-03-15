// WeatherDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function WeatherDetails() {
    const location = useLocation();
    const { weatherData } = location.state;

    return (
        <div>
            <h2>Weather Details</h2>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
    );
}

export default WeatherDetails;
