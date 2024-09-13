import React, { useState } from 'react';
import './App.css';
import logo from './weather.svg';

export default function Weather() {

    const [city, setCity] = useState();
    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleClick = () => {
        
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
                        <button onnClick={handleClick} >Verificar clima</button>
                    </div>
                </div>
            </main>
        </div>
    )
}