import React from 'react';
import './WeatherHistory.css';

function WeatherHistory({ history }) {
    return (
        <ul>
            {history.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}

export default WeatherHistory;