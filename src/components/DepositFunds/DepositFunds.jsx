import React, { useState } from 'react';
import './DepositFunds.css';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/MyContext';

export function DepositFunds() {
    const { userFunds, updateUserFunds } = useUserContext();
    const [amount, setAmount] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAmountChange = (event) => {
        setAmount(parseFloat(event.target.value));    

    };

    const handleDeposit = () => {
        if ( amount > 0) {
            const updatedFunds = userFunds + parseFloat(amount);
            updateUserFunds(updatedFunds);               
            
            
            localStorage.setItem('userFunds', updatedFunds);

            setSuccessMessage(`Has depositado $${amount} en tu cuenta.`);
            setErrorMessage('');
        } else {
            setErrorMessage('¡El monto no puede ser 0!');
        }
    };

    return (
        <section className='screen'>

            <section className='cardMenu'>
                <h2 className='titleFunds'>Depositar Fondos</h2>
                <h4>Tu saldo actual es de: ${userFunds}</h4>

                <div className='amount-input'>
                    <label className='labelll'>Monto: </label>
                    <input type='number' step='1' value={amount} onChange={handleAmountChange} />
                </div>

                <button onClick={handleDeposit}>Depositar</button>
                {successMessage && <p className='success-message'>{successMessage}</p>}
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <Link to="/home" className='success-home-review'>Ir a Home</Link>
            </section>

        </section>
    );
}