import React from "react";
import { Nav } from "../Nav/Nav";
import './Home.css';
import { useNavigate } from 'react-router-dom';
import logolcc from '../../assets/images/logolcc.png';

export function Home( {user, setUser}) {

    const navigate = useNavigate();

    const handleLogOut = () => {
    setUser([])                       
    navigate('/login');             
    }

    return (
        <div className="home">
            
            <section>
                <Nav user={user} setUser={setUser} />       
            </section>
            <section className="card">
                <section className="title-welcome">
                    <h2>Latinas Stock Bank</h2>
                    <p className="welextended"> Explora un nuevo mundo financiero con Latinas Stock Bank,<br></br>tu plataforma de banca de acciones personalizada.<br></br></p>
                </section>
                <section className="button-logout">
                    <p>Cerrar sesión</p>
                    <i class="fas fa-sign-out" onClick={handleLogOut}></i>
                </section>
            </section>
                
            <section class="barra-footer">
                <p>&copy; Dalian 2023. Todos los derechos reservados.</p>
                <img src={logolcc} alt="Logo" className='logolcc'></img>
            </section>
            
        </div>
    )
}




