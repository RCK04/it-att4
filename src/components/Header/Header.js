import React from 'react';
import './Header.css';
import logo from '../../images/weather.svg';

function Header(){
    return (
        <header>
            <img src={logo} alt='logo' className='logo'/>
            <h1>Weather App</h1>
        </header>
    );
}

export default Header;