import React from 'react';
import './Form.css';
import logo from '../../images/contact.png';
import { FaFacebookSquare, FaYoutube, FaLinkedin } from "react-icons/fa";
import SocialMediaItem from '../SocialMediaItem/SocialMediaItem';
import Input from '../Input/Input';
import Button from '../Button/Button';


function Form(){
    return (
        <div className='form'> 
            <div className="contact">
                <h2 className="first-text">Vamos entrar em contato</h2>
                <img src={logo} alt="Contact iamge" className='image' />
                <div className='social-links'>
                    <span className='second-text'>Nossas redes:</span>
                    <ul className='social-media'>
                        <SocialMediaItem>
                            <FaFacebookSquare></FaFacebookSquare>
                        </SocialMediaItem>

                        <SocialMediaItem>
                            <FaYoutube></FaYoutube>
                        </SocialMediaItem>

                        <SocialMediaItem>
                            <FaLinkedin></FaLinkedin>
                        </SocialMediaItem>
                    </ul>
                </div>
            </div>

            <div className="submit-form">
                <h4 className='third-text'>Entre em contato</h4>
                <form action="">
                    <Input type="text" label="Nome" placeholder="Escreva seu nome"></Input>
                    <Input type="email" label="Email" placeholder="Escreva seu email"></Input>

                    <div className='input-box'>
                        <textarea name="" id="message" cols="30" rows="10" ></textarea>
                    </div>

                    <Button>
                        Enviar
                    </Button>
                </form>
            </div>
            
        </div>
    );
}

export default Form;