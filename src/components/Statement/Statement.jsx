import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../Context/MyContext';
import './Statement.css';
import { Link } from 'react-router-dom';


export function Statement({ user }) {

  const storedFullName = localStorage.getItem('fullName');
  const storedUserName = localStorage.getItem('userName');
  const { userActions, userFunds } = useUserContext();
  
  const [localUserActions, setLocalUserActions] = useState([]);

  useEffect(() => {
      const storedUserActions = JSON.parse(localStorage.getItem('userActions'));
      if (storedUserActions) {
          setLocalUserActions(storedUserActions);
      }
  }, []);

  const calculateTotalValue = () => {
    let totalValue = 0;
    localUserActions.forEach((action) => {
        totalValue += action.value * action.quantity;
    });
    return totalValue;
};


  const [requestDate, setRequestDate] = useState('');



  useEffect(() => {
    const currentDate = new Date(); 
    const formattedDate = currentDate.toLocaleDateString();
    setRequestDate(formattedDate);
  }, []); 


  return (
    
      <section className="screen">
        
              <section className='cardMenu'>      
                <h1 className='titlecState'>Estado de Cuenta</h1>
                <div className='cardState'>
                  <p className='textState'> ¡Aquí puedes ver la información de tu estado de cuenta!</p>
                  <p><h4>Nombre completo:</h4> {storedFullName}</p>
                        <p><h4>Nombre de usuario:</h4> {storedUserName}</p>
                        <p><h4>Acciones y Valores:</h4> </p>
                          <ul className='actionsandvalues'>
                              {localUserActions.map((action, index) => (
                                  <li key={index}>
                                    <div className='action-item-state'>
                                          <h4> {action.name}</h4>
                                          <div className='itemspecific'>Cantidad: {action.quantity}</div>
                                          <div className='itemspecific'>Valor por acción: ${action.value}</div>
                                          <div className='itemspecific'>Valor total: ${action.value * action.quantity}</div>
                                      </div> 
                                  </li>
                              ))}
                          </ul>
                          
                    <p><h4>Fondos disponibles:</h4>${userFunds}</p>
                    <p><h4>Fecha de la solicitud: </h4>{requestDate}</p>
                </div>

                  <Link to="/home" className='success-home-review'>Ir a Home</Link>
              </section>
      </section>
      
  );
}
