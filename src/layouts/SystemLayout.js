import React, { Fragment } from 'react';
import AppBarMenu from '../components/AppBarMenu';
import SideBarMenu from '../components/SideBarMenu';

function SystemLayout(props) {

    const { children } = props;

    return(
        <Fragment>
            <AppBarMenu />
            <SideBarMenu />
            { children }
        </Fragment>
    )
}

export default SystemLayout;