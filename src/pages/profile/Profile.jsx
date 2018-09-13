import React, { PureComponent } from 'react'
import { connect } from 'react-redux';

class Profile extends PureComponent {
    render() {
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