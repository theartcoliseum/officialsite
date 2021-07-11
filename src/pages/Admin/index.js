import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal } from "mdbreact";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import AdminLanding from "./LandingPage";
import ManageEvent from "./ManageEvent";

const Admin = () => {
    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <AdminLanding />
                </Route>
                <Route path={`${path}/manage`}>
                    <ManageEvent />
                </Route>
            </Switch>
        </div>
    );
}

export default Admin;