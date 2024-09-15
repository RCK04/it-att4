import React, { useState } from 'react';
import './App.css';
import './root.css';
import logo from './weather.svg';
import cloudy from './cloudy.svg';
import clearSky from './clearSky.svg';
import rain from './rain.svg';
import snow from './snow.svg';
import fog from './fog.svg';
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
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'6310ed52c1f87447da25b338e8e33eb9&lang=pt'}`
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
            <header>
                <img src={logo} className='logo' alt='logo' />
                <h1>Weather App</h1>
            </header>

            <main className='show-weather'>
                <div className='input-container'>
                    <span>Cidade</span>
                    <input type='text' placeholder='Nome da cidade' value={city} onChange={handleCityChange} />
                    <div className='button-container'>
                        <button className='btn' onClick={handleClick} >Verificar clima</button>
                        {weather && <>
                            <div className='weather-info'>
                                <div className='info-top'>
                                    <h3>{weather.data.name}</h3>
                                    <img src={getWeatherImage(weather.data.weather[0].description)} />
                                </div>

                                <div className='info-mid'>
                                    <span>{kelvinToCelsius(weather.data.main.temp)}</span>
                                    <p>Temperatura</p>
                                </div>

                                <div className='info-bottom'>
                                    <p>{capitalizeFirstLetter(weather.data.weather[0].description)}</p>
                                </div>
                            </div>

                        </>}


                    </div>
                    
                </div>
            </main>
        </div>
    )
}