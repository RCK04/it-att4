import React, { useState } from 'react';
import './App.css';
import logo from './weather.svg';
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
        return (kelvin - 273.15).toFixed(1) + "°C";
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
                        <button onClick={handleClick} >Verificar clima</button>
                        {weather && <>
                            <div className='weather-info'>
                                <h3>{weather.data.name}</h3>
                                <p>Temperatura de {kelvinToCelsius(weather.data.main.temp)}</p>
                                <p>{weather.data.weather[0].description}</p>
                            </div>

                        </>}


                    </div>
                </div>
            </main>
        </div>
    )
}