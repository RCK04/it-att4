import React, { useState } from 'react';

import './css/App.css';
import './css/root.css';
import Header from './components/header/Header.js';
import Input from './components/input/Input.js';
import Button from './components/button/Button.js';
import WeatherInfo from './components/weatherInfo/WeatherInfo.js';
import cloudy from './images/cloudy.svg';
import clearSky from './images/clearSky.svg';
import rain from './images/rain.svg';
import snow from './images/snow.svg';
import fog from './images/fog.svg';
import axios from 'axios';

export default function Weather() {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const fetchWeather = async () => {
        try{
            const response = await axios.get
            (
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=pt`
            );
            console.log(response);
            setWeather(response);

        }
        catch(error) {
            console.log("Error ao usar o fetch no dado do clima", error)
        }
    }

    const handleClick = () => {
        fetchWeather();
    }

    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(0) + "°";
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getWeatherImage = (description) => {
        const lowerCaseDescription = description.toLowerCase();
    
        if (lowerCaseDescription.includes("nublado") || lowerCaseDescription.includes("nuvens")) {
            return cloudy;

        } else if (lowerCaseDescription.includes("céu limpo")) {
            return clearSky;
        } else if (lowerCaseDescription.includes("chuva") || lowerCaseDescription.includes("garoa") ) {
            return rain;
        } else if (lowerCaseDescription.includes("neve")) {
            return snow;
        } else if (lowerCaseDescription.includes("névoa")) {
            return fog;
        }

        return cloudy; 
    }

    return (
        <div className='weather-container'>
            <Header></Header>

            <main className='show-weather'>
                <Input label="Cidade" value={city} onChange={handleCityChange} placeholder="Nome da cidade"/>

                    <div className='button-container'>
                        <Button label="Verificar clima" onClick={handleClick}></Button>
                        {weather && <>
                            <WeatherInfo 
                                weatherData={weather.data} 
                                getWeatherImage={getWeatherImage} 
                                kelvinToCelsius={kelvinToCelsius} 
                                capitalizeFirstLetter={capitalizeFirstLetter}>
                            </WeatherInfo>

                        </>}


                    </div>
                    
            </main>
        </div>
    )
}