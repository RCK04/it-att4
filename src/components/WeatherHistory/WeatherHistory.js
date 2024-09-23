import React from 'react';
import './WeatherHistory.css';

function WeatherHistory({ history }) {
    return (
        <div className='history-container'>
            <h2>Últimos locais</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

        </div>
    );
}

export default WeatherHistory;