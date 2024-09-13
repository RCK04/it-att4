import React from 'react';
import './App.css';
import logo from './weather.svg';

export default function Weather() {
    return (
        <div className='weather-container'>
            <header>
                <img src={logo} className='logo' />
                <h1>Weather App</h1>
            </header>

            <main className='show-weather'>
                
            </main>
        </div>
    )
}