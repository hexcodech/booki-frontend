import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <h1>Header</h1>
		);
    }
}

const mapStateToProps = (state) => {
    return {
        // exampleProp: state.exampleProp,
    }
}

const mapDispatchToProps = (dispatch) => {
    // return bindActionCreators({ exampleAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);