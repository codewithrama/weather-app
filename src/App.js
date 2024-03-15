// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import WeatherDetails from '../components/WeatherDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/weather-details" component={WeatherDetails} />
      </Switch>
    </Router>
  );
}

export default App;
