/*eslint-disable*/
import React, { useState, Fragment, useEffect, useContext } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal
} from "mdbreact";
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-scroll';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login';
import firebaseConfig from '../../firebase/firebase.config';
import firebase from "firebase/app";


//initialise firebase as global object

firebase.initializeApp(firebaseConfig);
window.firebase = firebase;

// import logo from '../../assets/images/logo.png';

const Header = () => {
    let history = useHistory();
    const location = useLocation();

    const {user, signin, signout} = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isHome, setIsHome] = useState(true);

    useEffect(() => {
        if(user) {
            history.push(`/protected`);
        } else {
            history.push(`/`);
        }
    }, [user]);

    useEffect(() => {
        if(location && location.pathname) {
            const paths = location.pathname.split('/');
            console.log(paths);
            if(paths.length > 2) {
                setIsHome(false);
            } else {
                setIsHome(true);
            }
        }
    }, [location]);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    }

    const gotoDashboard = () => {
        if(history.location.pathname.includes('dashboard')) return;
        history.push(`protected/dashboard`);
    }

    const goToHome = () => {
        history.push('/protected');
    }

    const login = () => {
        setIsLoginModalOpen(true);
    }

    function logout(){
        signout(() => {});
    }

    return (
        <Fragment>
            <div id="error-toast">
            </div>
            <MDBNavbar color="elegant-color-dark" dark expand="md" scrolling fixed="top">
                <MDBNavbarBrand onClick={goToHome}>
                    {/* <img src={logo} alt="site logo" /> */}
                    <strong>The Art Coliseum</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav left>
                        {isHome && (<Fragment>
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
                        </Fragment>)}
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
                                            <MDBDropdownItem onClick={goToHome}>Home</MDBDropdownItem>
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