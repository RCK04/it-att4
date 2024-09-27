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

    // Utilização do Hook de useState para armazenar o nome da cidade e atualizar esse estado
    const [city, setCity] = useState('');
     // Utilização do Hook de useState para armazenar os dados do clima pela API e para atualizar o estado
    const [weather, setWeather] = useState('');

    const[history, setHistory] = useState([]);

    // Carregar o histórico ao iniciar
    useEffect(() => {
        const loadHistory = localStorage.getItem('weatherHistory');
        if (loadHistory) {
            setHistory(JSON.parse(loadHistory));
        }
    }, []);

    // Salvar o histórico no localStorage sempre que for atualizado
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem('weatherHistory', JSON.stringify(history));
        }
    }, [history]);

    // Atualiza o estado da "city" com o valor que for colocado no input
    // o "event.target.value" será o novo valor
    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    // Fazemos uma solicitação ao protocolo HTTP GET para a API do OpenWeatherMap usando o axios para obter esses dados do clima
    const fetchWeather = async () => {
        try{
            const response = await axios.get
            (
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=pt`
            );
            
            // Caso seja um retorno positivo setamos o Weather com o valor da "response"
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
            const response = await axios.post
            (
                'https://jsonplaceholder.typicode.com/posts'
            );
            if (response.status  === 201) {
                setHistory([...history, cityName]);
            }

        } catch (error) {
            console.log("Erro ao adicionar ao histórico:", error);
        }
    }
        
    // Ao clicar no botão irá fazer a consulta do clima
    // Vamos verificar se a cidade existe
    const handleClick = async () => {
        if(!city){
            alert("Insira uma cidade no input.")
            return;
        }

        const cityName = await fetchWeather();

        if(cityName && history.includes(cityName)){
            alert('Cidade já está no histórico.');
            return;
        }

        if(cityName && !history.includes(cityName)){
            await addWeatherHistory(cityName);
            setCity('');
        }
    }

    // A API trás o valor da temperatura em Kelvin, então é feito a conversão para Celsius
    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(0) + "°";
    }

    // Colocar a primeira letra da descrição retornada pela API sobre o clima em Maiúscula
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
        // Exemplo com o slice
        // teste -> T + este = Teste
        //              1234
    }

    // Retornar uma imagem correspondente ao clima com base na descrição
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

    // Função para remover um item da lista
    const removeItem = (index) => {
        const update = history.filter((_, i) => i !== index);
        setHistory(update);  

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