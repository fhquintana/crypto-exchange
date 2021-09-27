import React from 'react';

function PublicLayout(props) {

    const { children } = props;

    return(
        <div>
            { children }
        </div>
    )
}

export default PublicLayout;