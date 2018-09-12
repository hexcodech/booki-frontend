import React, { PureComponent } from 'react';
import { CallbackComponent } from 'redux-oidc';
import { withRouter } from 'react-router-dom';
import userManager from '../../utils/userManager';

class Callback extends PureComponent {
    render() {
        return (
            <CallbackComponent
                userManager={userManager}
                successCallback={ () => this.props.history.push('/') }
                errorCallback={error => {
                    console.error(error);
                    this.props.history.push('/')
                }}
            >
                <div>Redirecting...</div>
            </CallbackComponent>
        );
    }
}

export default withRouter(Callback);