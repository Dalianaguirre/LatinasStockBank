import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function AppProvider({ children }) {
    
    const initialUserFunds = localStorage.getItem('userFunds');
    const [userFunds, setUserFunds] = useState(initialUserFunds ? parseFloat(initialUserFunds) : 10000); 


    const initialUserActions = localStorage.getItem('userActions');
        const [userActions, setUserActions] = useState(
        initialUserActions ? JSON.parse(initialUserActions) : [
            { name: 'IBEIberdrola derived', value: 100, quantity: 10 },
            { name: 'NVIDIA Corporation', value: 200, quantity: 5 },
            { name: 'Apple Inc.', value: 150, quantity: 8 },
        ]
    );


    const updateUserFunds = (newFunds) => {
        setUserFunds(newFunds);
    };


    const subtractUserActions = (actionName, quantity) => {
        setUserActions((prevActions) =>
            prevActions.map((action) => {
                if (action.name === actionName) {
                    action.quantity -= quantity;
                }
                return action;
            })
        );
    };

    
    const addUserActions = (actionName, quantity) => {
        setUserActions((prevActions) =>
            prevActions.map((action) => {
                if (action.name === actionName) {
                    action.quantity += quantity;
                }
                return action;
            })
        );
    };

    return (
        <UserContext.Provider
            value={{ userFunds, setUserFunds, updateUserFunds, userActions, setUserActions, subtractUserActions, addUserActions }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}