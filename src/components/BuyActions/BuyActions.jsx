import React, { useState, useEffect } from 'react';
import './BuyActions.css';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/MyContext';

export function BuyActions() {
    const { userActions, addUserActions, userFunds, updateUserFunds } = useUserContext();
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

    const handleBuyAction = (e) => {
        if (quantity <= 0) {
            setErrorMessage('Escoge la acción que quieres comprar y la cantidad debe ser mayor que cero.');
        } else {
            const selectedActionData = userActions.find((action) => action.name === selectedAction);
            if (selectedActionData) {
                const totalPrice = selectedActionData.value * quantity;
                if (totalPrice <= userFunds) {
                    updateUserFunds((prevFunds) => prevFunds - totalPrice); // Actualizo los fondos
                    
                    setSuccessMessage(`Has comprado ${quantity} acciones de ${selectedAction} por un total de $${totalPrice}.`);
                    setErrorMessage('');
                    setSelectedAction('');
                    setQuantity('');

                    addUserActions(selectedAction, quantity);

                    const updatedUserFunds = userFunds - totalPrice;
                        console.log('Saldo actualizado:', updatedUserFunds);
                    const updatedUserActions = userActions.map((action) => {
                        if (action.name === selectedAction) {
                            return {
                                ...action,                 //hago una copia en la que cambio mis acciones
                                quantity: action.quantity + quantity,
                            };
                        }
                        return action;
                    });
            
                    localStorage.setItem('userFunds', updatedUserFunds);
                    localStorage.setItem('userActions', JSON.stringify(updatedUserActions));
                } else {
                    setErrorMessage('¡No tienes suficientes fondos para realizar esta compra!');
                }
            }
        }
    };

    useEffect(() => {
        console.log('Valores actualizados después de la compra:');
        console.log('Saldo actualizado:', userFunds);
        console.log('Acciones actualizadas:', userActions);
    }, [userFunds, userActions]);


    return (
        <section className='screen'>
            <section className='cardMenu'>

                <h1 className='titlec'>Comprar Acciones</h1>
                <h4>Tu saldo actual es de: ${userFunds}</h4>

                <div className='action-select'>
                    <label className='label'>Selecciona una acción:</label>
                    <select value={selectedAction} onChange={handleActionChange}>
                        <option value=''>Selecciona una acción</option>
                        {userActions.map((action, index) => (
                            <option key={index} value={action.name}>{action.name}</option>
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

                <button onClick={handleBuyAction}>Comprar</button>
                {successMessage && <p className='success-message'>{successMessage}</p>}
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <Link to="/home" className='success-home-review'>Ir a Home</Link>
            </section>
        </section>
    );
}