import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import LazyComponent from './utils/LazyComponent';

const AsyncHome = LazyComponent(() => import('./pages/Home'));

const Router = (props) => (
    <BrowserRouter>
        <div className="Router">
            {props.header}
            
            {props.children}
            <Route exact path="/" component={AsyncHome} />
        </div>
    </BrowserRouter>
);

export default Router;