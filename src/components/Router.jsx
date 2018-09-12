import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LazyComponent from '../utils/LazyComponent';

const AsyncHome = LazyComponent(() => import('../pages/home/Home'));

export default class Router extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div id="Router">
                    <this.props.header/>
                    
                    {this.props.children}
        
                    <Route exact path="/" component={AsyncHome} />
                </div>
            </BrowserRouter>
        );
    }
}