import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LazyComponent from '../utils/lazyComponent';

const AsyncHome = LazyComponent(() => import('../pages/home/Home'));
const AsyncCallback = LazyComponent(() => import('../pages/callback/Callback'));

export default class Router extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div id="Router">
                    <this.props.header/>
                    
                    {this.props.children}
        
                    <Route exact path="/" component={AsyncHome} />
                    <Route path="/callback" component={AsyncCallback} />
                </div>
            </BrowserRouter>
        );
    }
}