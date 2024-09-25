import React from 'react';
import './SocialMediaItem.css';

function SocialMediaItem( {children} ){
    return (
        <li className='li'>
            <a href="#">
                {children}
            </a>
        </li>
    );
}

export default SocialMediaItem;