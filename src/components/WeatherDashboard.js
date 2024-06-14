import React, { useState, useEffect } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import axios from 'axios';


const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      fetchForecast(city);
    } catch (error) {
      setError('Error fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      setForecast(response.data);
    } catch (error) {
      setError('Error fetching forecast data.');
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorite cities:', error);
    }
  };

  const addFavorite = async (city) => {
    try {
      const response = await axios.post('http://localhost:5000/favorites', { city });
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error('Error adding favorite city:', error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter((favorite) => favorite.id !== id));
    } catch (error) {
      console.error('Error removing favorite city:', error);
    }
  };

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <Search onSearch={fetchWeather} />
      {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <WeatherDisplay weather={weather} forecast={forecast} />
      )}
      <Favorites favorites={favorites} onAddFavorite={addFavorite} onRemoveFavorite={removeFavorite} />
    </div>
  );
};

export default WeatherDashboard;
