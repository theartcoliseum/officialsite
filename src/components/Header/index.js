import React, { useState, Fragment, useEffect, useContext } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal
} from "mdbreact";
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-scroll';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login';
// import logo from '../../assets/images/logo.png';

const Header = () => {
    let history = useHistory();
    const {user, signin, signout} = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        if(user) {
            history.push(`/protected`);
        } else {
            history.push(`/`);
        }
    }, [user]);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    }

    const gotoDashboard = () => {
        history.push(`protected/dashboard`);
    }

    const login = () => {
        setIsLoginModalOpen(true);
    }

    function logout(){
        signout(() => {});
    }

    return (
        <Fragment>
            <MDBNavbar color="elegant-color-dark" dark expand="md" scrolling fixed="top">
                <MDBNavbarBrand>
                    {/* <img src={logo} alt="site logo" /> */}
                    <strong>The Art Coliseum</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <MDBBtn color="elegant">
                                <Link activeClass="active" to="events" spy={true} smooth={true} duration={1000}>
                                    Events
                                    </Link>
                            </MDBBtn>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBBtn color="elegant">
                                <Link activeClass="active" to="about" spy={true} smooth={true} duration={1000}>
                                    About Us
                                    </Link>
                            </MDBBtn>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBBtn color="elegant">
                                <Link activeClass="active" to="services" spy={true} smooth={true} duration={1000}>
                                    Services
                                    </Link>
                            </MDBBtn>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBBtn color="elegant">
                                <Link activeClass="active" to="team" spy={true} smooth={true} duration={1000}>
                                    Team
                                    </Link>
                            </MDBBtn>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                <MDBIcon fab icon="twitter" />
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                <MDBIcon fab icon="facebook" />
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                <MDBIcon fab icon="instagram" />
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown right>
                                <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="user" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    {!user && <MDBDropdownItem onClick={login} >Login</MDBDropdownItem>}
                                    {user && (
                                        <Fragment>
                                        <MDBDropdownItem onClick={gotoDashboard}>My Dashboard</MDBDropdownItem>
                                        <MDBDropdownItem divider />
                                        <MDBDropdownItem onClick={logout}>Logout</MDBDropdownItem>
                                        </Fragment>
                                    )}
                                    
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
            <MDBModal isOpen={isLoginModalOpen} centered>
                <Login signin={signin} close={() => { setIsLoginModalOpen(false); }} />
            </MDBModal>
        </Fragment>
    );
}

export default Header;