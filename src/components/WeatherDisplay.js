import React from 'react';


const WeatherDisplay = ({ weather, forecast }) => {
  if (!weather || !forecast) {
    return <div className="weather-display">No data to display</div>;
  }

  return (
    <div className="weather-display">
      <h2>Current Weather in {weather.name}</h2>
      <div className="current-weather">
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Condition: {weather.weather[0].description}</p>
      </div>
      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {forecast.list.slice(0, 5).map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {item.main.temp}°C</p>
            <p>Condition: {item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
