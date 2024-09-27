import React from 'react';
import './Button.css';


function Button({children, onClick, type}){
    return (
        <button className='btn' type={type} onClick={(event) => {
            event.preventDefault();
            onClick();
        }}>
            {children}
        </button>
    );
}

export default Button;