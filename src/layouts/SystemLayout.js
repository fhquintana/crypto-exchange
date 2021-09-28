import React from 'react';
import AppBarMenu from '../components/AppBarMenu';
import SideBarMenu from '../components/SideBarMenu';
import { AppContextProvider } from '../contexts/AppContext';

function SystemLayout({ children }) {

    return(
        <AppContextProvider>
            <AppBarMenu />
            <SideBarMenu />
            { children }
        </AppContextProvider>
    )
}

export default SystemLayout;