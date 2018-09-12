import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
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
import userManager from '../../utils/userManager';

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
                    <NavbarBrand tag={Link} to="/" className="mr-5">
                        <img src="/img/logo/logo.svg" alt="Booki Logo"/>
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
                                <Input type="search" placeholder="" className="border-booki"/>
                                <InputGroupAddon addonType="append">
                                    <Button outline type="submit" color="booki">Search</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                        <Button outline color="booki" className="mx-3">Sell books</Button>
                        {this.props.user && !this.props.user.expired ? null : <a onClick={() => userManager.signinRedirect()}>Login</a> }
                    </Collapse>
                </Navbar>
            </div>
		);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.oidc.user,
    }
}

export default connect(mapStateToProps, null)(Header);