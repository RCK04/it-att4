import React from 'react';
import './input.css';


function Input({label, value, onChange, placeholder}){
    return (
        <div className='input-container'>
            <span>{label}</span>
            <input type='text' placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
}

export default Input;