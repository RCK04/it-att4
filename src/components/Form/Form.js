import React, { useState } from 'react';
import './Form.css';
import logo from '../../images/contact.png';
import { FaFacebookSquare, FaYoutube, FaLinkedin } from "react-icons/fa";
import SocialMediaItem from '../SocialMediaItem/SocialMediaItem';
import Input from '../Input/Input';
import Button from '../Button/Button';


function Form(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendForm = () => {
        if(!name || !email || !message){
            alert('Preencha todos os campos.')
            return;
        }

        alert('Formulário enviado');

        setName('');
        setEmail('');
        setMessage('');

    }

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
                <form>
                    <Input type="text" label="Nome" placeholder="Escreva seu nome" value={name} onChange={(e) => setName(e.target.value)}></Input>
                    <Input type="email" label="Email" placeholder="Escreva seu email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>

                    <div className='input-box'>
                        <textarea name="" id="message" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>

                    <Button type='submit' onClick={sendForm}>
                        Enviar
                    </Button>
                </form>
            </div>
            
        </div>
    );
}

export default Form;