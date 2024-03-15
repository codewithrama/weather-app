// Dashboard.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Dashboard() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const history = useHistory();

    const handleGetWeather = async () => {
        if (!city || !country) {
            setError('Please enter both city and country.');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.get(
                `https://api.weatherbit.io/v2.0/history/energy?lat=${city}&lon=${country}&start_date=2024-03-03&end_date=2024-03-10&threshold=63&units=I&key=8ff6b1c427824112b02b9f92f1485bbb&tp=daily`
            );
            if (response.data && response.data.error) {
                setError(response.data.error.message);
                setSnackbarOpen(true);
            } else {
                history.push({
                    pathname: '/weather-details',
                    state: { weatherData: response.data }
                });
            }
        } catch (error) {
            console.error('Error fetching weather data: ', error);
            setError('Error fetching weather data. Please try again later.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="City"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Country"
                    variant="outlined"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleGetWeather}>
                    Get Weather
                </Button>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default Dashboard;
