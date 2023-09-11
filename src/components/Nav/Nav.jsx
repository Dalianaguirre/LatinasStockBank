import React, { useState } from 'react';
import './Nav.css';
import logo from '../../assets/images/logo.jpg';

export function Nav({user}) {
    
    const [isOpen, setIsOpen] = useState('')       
    
    return ( 
        <section className='navbar'>
            <img src={logo} alt="Logotipo Technolatinas" className='nav-logo' />
            
            <div className={`nav_items ${isOpen && "open"}`}>
                    <a href="/home/change-pin"><i class="fa-solid fa-lock"></i> Cambiar PIN</a>
                    <a href="/home/review" user={user}><i class="fa-solid fa-seedling"></i> Mis Acciones</a>
                    <a href="/home/buy"><i class="fa-solid fa-cart-shopping"></i> Comprar</a>
                    <a href="/home/sell"><i class="fa-solid fa-wallet"></i> Vender</a>
                    <a href="/home/deposit"><i class="fa-solid fa-arrow-up-wide-short"></i> Depositar Fondos</a>
                    <a href="/home/statement"><i class="fa-solid fa-file-invoice"></i> Estado de Cuenta</a>
            </div>

            <div className={`nav-toggle ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)} >      
                <span></span>
                <span></span>
                <span></span>            
            </div>
        </section>
    )

}