import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';
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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { bookSearchStart } from '../../actions/search';
import userManager from '../../utils/userManager';
import throttle from '../../utils/throttle';
import SearchIcon from '../searchIcon/SearchIcon';

import './Header.css';

class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        
        this.state = {
            navbarOpen: false,
            profileDropdownOpen: false,
            searchTerm: '',
        };
    }

    toggleNavbar() {
        this.setState({
            navbarOpen: !this.state.navbarOpen,
        });
    }

    toggleProfileDropdown() {
        this.setState({
            profileDropdownOpen: !this.state.profileDropdownOpen,
        });
    }

    onSearchInputChange(e) {
        if (e.target.value.length < 3)
            return;
        this.props.bookSearchStart(e.target.value);
    };

    render() {
        return (
            <div id="Header">
                <Navbar light color="booki" expand="md">
                    <NavbarBrand tag={Link} to="/" className="mr-5">
                        <img src="/img/logo/logo.svg" alt="Booki Logo"/>
                    </NavbarBrand>
                    <NavbarToggler type="navbar" onClick={this.toggleNavbar} />

                    <Collapse isOpen={this.state.navbarOpen} navbar>
                        <Nav navbar>

                        </Nav>
                        <Form className="flex-grow-1">
                            <InputGroup>
                                <Input type="search" placeholder="" className="border-booki" onChange={throttle(200, this.onSearchInputChange)} />
                                <InputGroupAddon addonType="append">
                                    <Button outline type="submit" color="booki">
                                        <SearchIcon animated={this.props.search.bookSearchLoading} />
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                        <Button outline color="booki" className="mx-3">
                            <Translate value="application.header.sell_books" />
                        </Button>

                        {this.props.user && !this.props.user.expired ?
                            <Dropdown isOpen={this.state.profileDropdownOpen} toggle={this.toggleProfileDropdown}>
                                <DropdownToggle
                                tag="div"
                                onClick={this.toggleProfileDropdown}
                                data-toggle="dropdown"
                                >
                                    <Avatar 
                                    className="header-avatar-booki"
                                    email={this.props.user.profile.private.email} // Gravatar, etc...
                                    name={this.props.user.profile.private.username} // Generate avatar based on initials
                                    maxInitials={2}
                                    size="45px"
                                    round />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem header>{this.props.user.profile.private.username}</DropdownItem>
                                    <DropdownItem tag={Link} to="/profile">
                                        <FontAwesomeIcon icon={faUser} className="mr-1 text-muted" />
                                        <Translate value="application.header.profile" />
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => userManager.signoutRedirect()}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-1 text-muted" />
                                        <Translate value="application.header.logout" />
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown> :
                            <Button outline color="booki" className="mx-3" onClick={() => userManager.signinRedirect()}><Translate value="application.header.login" /></Button>
                        }
                    </Collapse>
                </Navbar>
            </div>
		);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.oidc.user,
        search: state.search,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ bookSearchStart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);