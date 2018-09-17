import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LazyComponent from '../utils/lazyComponent';

const AsyncCallback = LazyComponent(() => import('../pages/callback/Callback'));
const AsyncHome = LazyComponent(() => import('../pages/home/Home'));
const AsyncProfile = LazyComponent(() => import('../pages/profile/Profile'));

export default class Router extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div id="Router">
                    <this.props.header/>
                    
                    {this.props.children}
        
                    <div className="container">
                        <Route exact path="/" component={AsyncHome} />
                        <Route path="/profile" component={AsyncProfile} />
                        <Route path="/callback" component={AsyncCallback} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}