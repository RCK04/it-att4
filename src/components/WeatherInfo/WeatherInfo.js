import React from 'react';
import './WeatherInfo.css';


function WeatherInfo({ weatherData, getWeatherImage, kelvinToCelsius, capitalizeFirstLetter}){
    return (
        <div className='weather-info'>
            <div className='info-top'>
                <h3>{weatherData.name}</h3>
                <img src={getWeatherImage(weatherData.weather[0].description)} alt='weather' />
             </div>
            <div className='main-info'>

                <div className='info-mid'>
                    <span>{kelvinToCelsius(weatherData.main.temp)}</span>
                    <p>Temperatura</p>
                </div>

                <div className='info-bottom'>
                    <p>{capitalizeFirstLetter(weatherData.weather[0].description)}</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherInfo;