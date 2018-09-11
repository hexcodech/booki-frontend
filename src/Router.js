import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Home } from './pages/Home';

const Router = (props) => (
    <BrowserRouter>
        <div className="Router">
            {props.header}
            
            {props.children}
            <Route exact path="/" component={Home}/>
        </div>
    </BrowserRouter>
);

export { Router };