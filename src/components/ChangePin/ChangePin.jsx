import React, { useState } from 'react';
import './ChangePin.css';
import { Link, useNavigate } from 'react-router-dom';

export function ChangePin({ pin, setPin }) {
  const [currentPin, setCurrentPin] = useState('');         
  const [newPin, setNewPin] = useState('');                 
  const [confirmNewPin, setConfirmNewPin] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');     
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChangePin = () => {
    console.log("Valor de currentPin:", currentPin);
    console.log("Valor de PIN por defecto:", pin);
    
    if (currentPin === pin && newPin === confirmNewPin) {
      setPin(newPin);    
      localStorage.setItem('pin', newPin); 
      setSuccessMessage('¡PIN modificado con éxito!');
      setErrorMessage('')
      setCurrentPin('');    
      setNewPin('');
      setConfirmNewPin('');
    } else {
      setErrorMessage('PIN incorrecto o nuevo PIN no coincide'); 
      setSuccessMessage(''); 
    }
  };


  return (
    <section className='screen'>
      <section className='cardMenu'>
        <h1 className='titlec'>Cambiar PIN</h1>

        <div className='pininput'>
          <p>Ingresa tu PIN actual:</p>
          <input
            type="password"
            value={currentPin}             
            onChange={(e) => setCurrentPin(e.target.value)}
          />
        </div>

        <div className='pininput'>
          <p>Ingresa tu nuevo PIN:</p>
          <input
            type="password"
            value={newPin}                  
            onChange={(e) => setNewPin(e.target.value)} 
          />
        </div>

        <div className='pininput'>
          <p>Confirma tu nuevo PIN:</p>
          <input
            type="password"
            value={confirmNewPin}            
            onChange={(e) => setConfirmNewPin(e.target.value)}
          />
        </div>

        <button className='button-cpin' onClick={handleChangePin}>Cambiar PIN</button>
        {successMessage && <p className='success'>{successMessage}</p>}
        {errorMessage && <p className='errorc'>{errorMessage}</p>}

        <Link to="/home" className='success-home-review'>Ir a Home</Link>

      </section>      
    </section>
  );
}