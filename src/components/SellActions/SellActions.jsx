import React, { useState, useEffect } from 'react';
import './SellActions.css';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/MyContext';

export function SellActions() {
    const { userActions, subtractUserActions, userFunds, updateUserFunds } = useUserContext();
    const [selectedAction, setSelectedAction] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleActionChange = (event) => {
        setSelectedAction(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleSellAction = () => {
        if (quantity <= 0) {
            setErrorMessage('La cantidad debe ser mayor que cero.');
        } else {
            const selectedActionData = userActions.find((action) => action.name === selectedAction);
            if (selectedActionData) {
                if (selectedActionData.quantity >= quantity) {
                    const totalPrice = selectedActionData.value * quantity;
                    setSuccessMessage(`Has vendido ${quantity} acciones de ${selectedAction} por un total de $${totalPrice}.`);
                    setErrorMessage('');

                    
                    const updatedUserFunds = userFunds + totalPrice;
                    const updatedUserActions = userActions.map((action) => {
                        if (action.name === selectedAction) {
                            return {
                                ...action,
                                quantity: action.quantity - quantity,
                            };
                        }
                        return action;
                    });

                    updateUserFunds(updatedUserFunds);    
                    
                    subtractUserActions(selectedAction, quantity);

                    // Luego, actualizo los datos en el localStorage
                    localStorage.setItem('userFunds', updatedUserFunds);
                    localStorage.setItem('userActions', JSON.stringify(updatedUserActions));
                } else {
                    setErrorMessage('¡No tienes suficientes acciones para vender!');
                }
            } else {
                setErrorMessage('¡Selecciona la acción que quieres vender!');
            }
        }
    };

    useEffect(() => {
        console.log('Valores actualizados después de la venta:');
        console.log('userFunds:', userFunds);
        console.log('userActions:', userActions);
    }, [userFunds, userActions]);

    return (
        <section className='screen'>
            <section className='cardMenu'>
                <h1 className='titlec'>Vender Acciones</h1>
                <h4>Tu saldo actual es de: ${userFunds}</h4>

                <div className='action-select'>
                    <label>Selecciona una acción:</label>
                    <select value={selectedAction} onChange={handleActionChange}>
                        <option value=''>Selecciona una acción</option>
                        {userActions.map((action, index) => (
                            <option key={index} value={action.name}>
                                {action.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                {selectedAction && (
                    <h4>Valor de la acción: ${userActions.find((action) => action.name === selectedAction)?.value}</h4>
                )}
                </div>
                <div className='quantity-select'>
                    <label className='labell'>Cantidad:</label>
                    <input type='number' value={quantity} onChange={handleQuantityChange} />
                </div>

                <button onClick={handleSellAction}>Vender</button>
                {successMessage && <p className='success-message'>{successMessage}</p>}
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <Link to='/home' className='success-home-review'>
                    Ir a Home
                </Link>
            </section>
        </section>
    );
}
