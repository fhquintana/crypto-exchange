import React, { useState } from 'react';

const AppContext = React.createContext({});

export function AppContextProvider({ children }) {

    const [sbOpen, setSbOpen] = useState(false);
    const [accountBoxes, setAccountBoxes] = useState([{}]);

    const state = {
        sbOpen, setSbOpen,
        accountBoxes, setAccountBoxes,
    };

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;