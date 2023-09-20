import React, { useState, useEffect } from 'react';
import './ReviewActions.css';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/MyContext';

export function ReviewActions({ user }) {
    const { userActions } = useUserContext();

    // const [localUserActions, setLocalUserActions] = useState([]);

    // useEffect(() => {
        
    //     const storedUserActions = JSON.parse(localStorage.getItem('userActions'));
    //     if (storedUserActions) {
    //         setLocalUserActions(storedUserActions);
    //     }
    // }, []);

    const calculateTotalValue = () => {
        let totalValue = 0;
        userActions.forEach((action) => {
            totalValue += action.value * action.quantity;
        });
        return totalValue;
    };

    return (
        <section className='screen'>
            <section className='cardMenu'>
                <h1 className='titlec'>Mis Acciones</h1>
                <p className='text'>
                    <strong>{user}</strong> ¡Aquí puedes ver la información detallada de tus acciones y su valor en el mercado!
                </p>

                <div className='resume'>
                    <ul>
                        {userActions.map((action, index) => (
                            <li key={index}>
                                <div className='action-item'>
                                    <h4>{action.name}</h4>
                                    <div>Cantidad: {action.quantity}</div>
                                    <div>Valor por acción: ${action.value}</div>
                                    <div>Valor total: ${action.value * action.quantity}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <p>
                    <strong>Valor total de tus acciones:</strong> ${calculateTotalValue()}
                </p>
                <Link to='/home' className='success-home-review'>
                    Ir a Home
                </Link>
            </section>
        </section>
    );
}
