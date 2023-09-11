import React, { useState, useEffect } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';

export function Login({ setUser, setStep }) {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(false);
    
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()                       
        if(fullName === "" || userName === "") {
            setError(true)
            return
        }                    
        setError(false)                          
        setUser([fullName])                      
        setUserName([userName])
        setStep(2);                              
        navigate('/pinvalidation');            
    }


    useEffect(() => {
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('userName', userName);
    }, [fullName, userName]);


    return (
        <section className='login'>
            <h1 className='title'>Latinas Stock Bank</h1>

            <section className='card-login'>
                <form onSubmit={handleSubmit}>
                    <div className='subtitle'>
                        <h1>Ingresa tus datos</h1>
                    </div>

                    <input
                        type="text"
                        placeholder="Nombre y Apellido*"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Usuario*"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <button className='button-login'>Siguiente</button>
                    {error && <p className='error'><i class="fa-solid fa-triangle-exclamation"></i> Todos los campos son obligatorios</p>}
                </form>
            </section>
        </section>
    );
}
