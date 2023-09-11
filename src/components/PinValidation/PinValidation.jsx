import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PinValidation.css';

export function PinValidation({ user, setAuthenticated, pin, setPin }) {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleAuthenticate = () => {
        const storedPin = localStorage.getItem('pin');
        console.log("Pin ingresado:", pin);
        if (pin === storedPin) { 
            setAuthenticated(true);
            setErrorMessage('');
            navigate('/home');
        } else {
            setErrorMessage('PIN incorrecto');
        }
    };

    return (
        <section className='validation'>
            <h1 className="welcome">¡Hola {user}!</h1>
            <p className='wel'>Bienvenidx a</p>
            <p className='titlePin'>Latinas Stock Bank</p>
            <section className="card-validation">
                <h3>Ingresa tu PIN para continuar:</h3>
                <input
                    type="password"
                    placeholder="PIN"
                    onChange={(e) => {
                        setPin(e.target.value);
                        setErrorMessage('');
                    }}
                />
                <p className='alert'>PIN por defecto: 1234</p>
                <button className='button-home' onClick={handleAuthenticate}>Ingresar</button>
                {errorMessage && <p className='error'><i className="fa-solid fa-triangle-exclamation"></i>{errorMessage}</p>}
            </section>
        </section>
    );
}

