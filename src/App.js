import './App.css';
import React, { useState, useEffect } from 'react';          
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";
import { PinValidation } from './components/PinValidation/PinValidation';
import { ChangePin } from "./components/ChangePin/ChangePin";
import { ReviewActions } from './components/ReviewActions/ReviewActions';
import { BuyActions } from './components/BuyActions/BuyActions';
import { SellActions } from './components/SellActions/SellActions';
import { DepositFunds } from './components/DepositFunds/DepositFunds';
import { AppProvider, useUserContext } from './Context/MyContext';
import { Statement } from './components/Statement/Statement';

function App() {
    const [user, setUser] = useState('');
    const [step, setStep] = useState(1); 
    const [authenticated, setAuthenticated] = useState(false);
    const [pin, setPin] = useState('1234');


    const initPin = () => {
        const storedPin = localStorage.getItem('pin');
        if (!storedPin) {                                                
        localStorage.setItem('pin', '1234');
        }
    };

    useEffect(() => {
        initPin();                                                      
    }, []);


    const updatePin = (newPin) => {
        setPin(newPin);
        localStorage.setItem('pin', newPin);
    };

    const { updateUserFunds, addUserActions } = useUserContext();

    useEffect(() => {
        const storedUserFunds = localStorage.getItem('userFunds');
        const storedUserActions = localStorage.getItem('userActions');

        if (storedUserFunds) {
        updateUserFunds(parseFloat(storedUserFunds));
        }

        if (storedUserActions) {
        addUserActions(JSON.parse(storedUserActions));
        }
    }, []);

    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            step === 1 ? (
                                <Login setUser={setUser} setStep={setStep} /> 
                            ) : step === 2 ? (
                                <PinValidation user={user} setAuthenticated={setAuthenticated} pin={pin} setPin={setPin}
                                />
                            ) : authenticated ? (
                                <Home>
                                    <Route path="/change-pin" element={<ChangePin pin={pin} setPin={updatePin} setUser={setUser} />} />
                                    <Route path="/review" element={<ReviewActions user={user}  />} />
                                    <Route path="/buy" element={<BuyActions  />} />
                                    <Route path="/sell" element={<SellActions  />} />
                                    <Route path="/deposit" element={<DepositFunds />} />
                                    <Route path="/statement" element={<Statement user={user} fullName="Nombre Completo" username="Nombre de Usuario" requestDate="Fecha de Solicitud" />} />
                                </Home>
                            ) : null
                        }
                    />

                    <Route path="/login" element={ <Login setUser={setUser} setStep={setStep} /> } /> 
                    <Route path="/pinvalidation" element={ <PinValidation user={user} setAuthenticated={setAuthenticated} pin={pin} setPin={setPin} /> } />
                    <Route path="/home" element={ <Home user={user} setUser={setUser} /> } />
                    <Route path="/home/change-pin" element={ <ChangePin pin={pin} setPin={updatePin} setUser={setUser} /> } />
                    <Route path="/home/review" element={ <ReviewActions user={user}  /> } />
                    <Route path="/home/buy" element={ <BuyActions  /> } />
                    <Route path="/home/sell" element={ <SellActions  /> } />
                    <Route path="/home/deposit" element={<DepositFunds />} />
                    <Route path="/home/statement" element={<Statement user={user} fullName="Nombre Completo" username="Nombre de Usuario" requestDate="Fecha de Solicitud" />} />
                </Routes>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;



