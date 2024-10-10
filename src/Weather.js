import { React, useState, useEffect } from 'react';

import './css/App.css';
import './css/root.css';
import './css/reset.css';
import Header from './components/Header/Header.js';
import Input from './components/Input/Input.js';
import Button from './components/Button/Button.js';
import WeatherInfo from './components/WeatherInfo/WeatherInfo.js';
import WeatherHistory from './components/WeatherHistory/WeatherHistory.js';
import Form from './components/Form/Form.js';
import cloudy from './images/cloudy.svg';
import clearSky from './images/clearSky.svg';
import rain from './images/rain.svg';
import snow from './images/snow.svg';
import fog from './images/fog.svg';
import axios from 'axios';

export default function Weather() {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');
    const[history, setHistory] = useState([]);

    useEffect(() => {
        getHistory();
    }, [])

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const fetchWeather = async () => {
        try{
            const response = await axios.get
            (
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=pt`
            );
            
            if(response.status === 200){
                setWeather(response);
                return response.data.name;
            }

        }
        catch(error) {
            console.log("Error ao usar o fetch no dado do clima", error)
        }

        return null;
    }

    const addWeatherHistory = async (cityName) => {
        try {
            const addNewItem = {
                id: history.length + 1,
                name: cityName
            };

            const response = await axios.post
            (
                'http://localhost:3005/history', addNewItem
            );
            if (response.status  === 201) {
                setHistory([...history, addNewItem]);
            }

        } catch (error) {
            console.log("Erro ao adicionar ao histórico:", error);
        }
    }
        
    const handleClick = async () => {
        if(!city){
            alert("Insira uma cidade no input.")
            return;
        }

        const cityName = await fetchWeather();

        const isCityExist = history.some(item => item.name === cityName);

        if(cityName && isCityExist){
            alert('Cidade já está no histórico.');
            return;
        }

        if(cityName && !isCityExist){
            await addWeatherHistory(cityName);
            setCity('');
        }
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

    const removeItem = (index) => {
        const update = history.filter((_, i) => i !== index);
        setHistory(update);
    }

    const getHistory = async () => {

        const response = await fetch('http://localhost:3005/history')
        const data = await response.json();
        setHistory(data);
    }

    return (
        <div className='weather-container'>
            <Header></Header>

            <main className='show-weather'>
                <Input type="text" label="Cidade" value={city} onChange={handleCityChange} placeholder="Nome da cidade"/>

                    <div className='button-container'>
                        <Button onClick={handleClick}>Verificar clima</Button>
                        <div className='teste'>

                            
                            {weather && <>
                                <WeatherInfo 
                                    weatherData={weather.data} 
                                    getWeatherImage={getWeatherImage} 
                                    kelvinToCelsius={kelvinToCelsius} 
                                    capitalizeFirstLetter={capitalizeFirstLetter}>
                                </WeatherInfo>

                            </>}


                            <WeatherHistory history={history} removeItem={removeItem} />
                        </div>
                    </div>

                    <section className='form-container'>
                        <Form></Form>
                    </section>
                
                    
            </main>
        </div>
        
    )
}