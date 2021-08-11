/*eslint-disable*/
import React, { useState, Fragment, useEffect, useContext } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal
} from "mdbreact";
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-scroll';
import { AuthContext } from '../../context/AuthContext';
import { signout } from '../../firebase/firebase.auth';
import { updateUserDB } from '../../firebase/firebase.db';
import Login from '../Login';
import Spinner from '../Spinner';
import UpdateModal from '../Login/UpdateModal';

import logo from '../../assets/images/logo.png';

const Header = () => {
    let history = useHistory();
    const location = useLocation();

    const {user, setUser, setIsLoading, isLoading} = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen]  = useState(false);
    const [isHome, setIsHome] = useState(true);

    useEffect(() => {
        if(user) {
            if(user.mobile==='' && user.city ===''){
                setUpdateModalOpen(true);
            }
            history.push(`/protected`);
        } else {
            //Logout on page refresh
            signout(logoutCallback);
            history.push(`/`);
        }
    }, [user]);


    useEffect(() => {
        if(location && location.pathname) {
            const paths = location.pathname.split('/');
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

    const updateSucccess = () =>{
        setUpdateModalOpen(false);
        setIsLoading(false);
    }

    const updateUser = (user,mobile,city) =>{
        updateUserDB(user.id,mobile,city,updateSucccess);
    }

    const gotoDashboard = () => {
        history.replace('/protected/dashboard');
    }

    const gotoAdminDashboard = () => {
        history.replace('/protected/admin');
    }

    const goToHome = () => {
        history.replace('/protected');
    }

    const goToConfig = () =>{
        history.replace('/protected/config');
    }

    const logoutCallback = () => {
        setUser(null);
        history.push('/');
    }

    const login = () => {
        setIsLoginModalOpen(true);
    }

    return (
        <Fragment>
            <div id="error-toast">
            </div>
            {isLoading && <Spinner />}
            <MDBNavbar color="elegant-color-dark" dark expand="md" scrolling fixed="top">
                <MDBNavbarBrand onClick={goToHome}>
                    <img src={logo} id="site-logo" alt="site logo" />
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
                                        <MDBDropdownItem className="pointer-none">Welcome, {user.f_name}</MDBDropdownItem>
                                            <MDBDropdownItem onClick={goToHome}>Home</MDBDropdownItem>
                                        <MDBDropdownItem onClick={gotoDashboard}>My Dashboard</MDBDropdownItem>
                                        <MDBDropdownItem onClick={gotoAdminDashboard}>Admin Dashboard</MDBDropdownItem>
                                        <MDBDropdownItem onClick={goToConfig}>Admin Config</MDBDropdownItem>
                                        <MDBDropdownItem divider />
                                        <MDBDropdownItem onClick={() => signout(logoutCallback)}>Logout</MDBDropdownItem>
                                        </Fragment>
                                    )}
                                    
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
            <MDBModal isOpen={isLoginModalOpen} centered>
                <Login setUser={setUser} setIsLoading={setIsLoading} close={() => { setIsLoginModalOpen(false); }} />
            </MDBModal>
            <MDBModal isOpen={isUpdateModalOpen} centered>
                <UpdateModal updateUser={updateUser} user={user} setIsLoading={setIsLoading} close={() => { setUpdateModalOpen(false); }} />
            </MDBModal>
        </Fragment>
    );
}

export default Header;