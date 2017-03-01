import React				from 'react';
import {connect}			from 'react-redux';

const Content = ({children}) => {

    return (
        <main className='content'>
            {children}
        </main>
    );
};

export default connect()(Content);
