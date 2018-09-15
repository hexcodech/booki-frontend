import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import userManager from '../../utils/userManager';

class Profile extends PureComponent {
    render() {
        if (!this.props.user || this.props.user.expired)
            userManager.signinRedirect();
        
        return (
            <div>
                {JSON.stringify(this.props.user)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.oidc.user,
    }
}

export default connect(mapStateToProps)(Profile);