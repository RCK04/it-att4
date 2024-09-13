import React, { useState } from 'react';
import './App.css';
import logo from './weather.svg';
import axios from 'axios';

export default function Weather() {

    const [city, setCity] = useState('');
    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const fetchWeather = async () => {
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'6310ed52c1f87447da25b338e8e33eb9'}`);
            console.log(response);

        }
        catch{

        }
    }

    const handleClick = () => {
        fetchWeather();
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
                    </div>
                </div>
            </main>
        </div>
    )
}