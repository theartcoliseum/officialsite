import React, { useState, Fragment, useEffect, useContext } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBModal
} from "mdbreact";
import { useHistory, useLocation } from 'react-router-dom';
import {updateAboutUs,getAboutUsData} from '../../firebase/firebase.db';
import { AuthContext } from '../../context/AuthContext';


const Config = () => {
    const {setIsLoading} = useContext(AuthContext);
    const [aboutUs,setAboutUs] = useState('');
    const [services, setServices] = useState('');
    const [teamMember,setTeam] = useState([{
        name:'Suvecchya Banerjee',
        role:'Developer',
        contact:'+9124567890',
        profilePhoto:''
    }]);

    useEffect(() => {

       getAboutData();
    }, []);

    function Teamsrender(){
        const memberList = teamMember.map((mem)=>{
            <div>

            {mem.name}
                {/* <div className="row">
                    <div className="col-12">
                        <input type="text" value={mem.name} placeholder="Name"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="text" value={mem.role} placeholder="Role"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="text" value={mem.contact} placeholder="Contact"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="file"></input>
                    </div>
                </div> */}
                <hr/>
            </div>
        });
        return (
            <div>{memberList}</div>
        )
        
    }

    const getAboutData = () =>{
        setIsLoading(true);
        getAboutUsData(successCallBackAboutUs);
    }

    function successCallBackAboutUs(data){
        setAboutUs(data);
        setIsLoading(false);
    }

    const mystyle = {
        margin: "140px auto",
        textAlign: "center",
      };

    function successCallBack(e){
        setIsLoading(false);
    }

    const submitForm = () =>{
        setIsLoading(true);
        updateAboutUs(aboutUs,successCallBack);
    }

    return(
        <div style={mystyle} className="configPage">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <label className="event-title-bold" htmlFor="aboutmesection">About Us Section</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <textarea value={aboutUs} onChange={(e)=>setAboutUs(e.target.value)} id="aboutmesection" name="aboutMeSection" rows="4" cols="50"/>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <label className="event-title-bold" htmlFor="aboutmesection">Services</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <textarea onChange={(e)=>setServices(e.target.value)} id="aboutmesection" name="aboutMeSection" rows="4" cols="50"/>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <label className="event-title-bold" htmlFor="aboutmesection">Team {teamMember.length}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Teamsrender/>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="row">
                <div className="col-12">
                    <MDBBtn
                        onClick={()=>submitForm()}
                        variant="contained"
                        color="elegant">Submit</MDBBtn>
                </div>
            </div>
        </div>
    )
}

export default Config; 