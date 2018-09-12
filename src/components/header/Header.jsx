import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
} from 'reactstrap';

import './Header.css';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            navbarOpen: false,
        };
    }

    render() {
        return (
            <div id="Header">
                <Navbar light color="booki" expand="md">
                    <NavbarBrand className="mr-5">
                        <img src="/img/logo/logo.svg"/>
                    </NavbarBrand>
                    <NavbarToggler type="navbar" onClick={() => this.setState({
                        ...this.state,
                        navbarOpen: !this.state.navbarOpen,
                        })}>
                    </NavbarToggler>

                    <Collapse isOpen={this.state.navbarOpen} navbar>
                        <Nav navbar>

                        </Nav>
                        <Form className="flex-grow-1">
                            <InputGroup>
                                <Input type="search" placeholder="" className="mutedPlaceholder"/>
                                <InputGroupAddon addonType="append">
                                    <Button outline type="submit" color="booki">Search</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </Collapse>
                </Navbar>
            </div>
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

export default connect(mapStateToProps, null)(Header);