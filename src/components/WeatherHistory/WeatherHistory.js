import React from 'react';
import './WeatherHistory.css';
import { FaRegTrashAlt } from 'react-icons/fa';

function WeatherHistory({ history, removeItem }) {
    return (
        history.length > 0 && (
        <div className='history-container'>
            <h2>Últimos locais</h2>
            <div className='scroll-container'>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            {item.name}
                            <button onClick={() => removeItem(index)}> <FaRegTrashAlt /> </button>
                        
                        </li>
                    ))}
                </ul>
            </div>

        </div>
        )
    );
}

export default WeatherHistory;