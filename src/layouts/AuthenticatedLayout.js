import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';

const AuthenticatedLayout = () => {
    let { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <HomePage />
                </Route>
                <Route path={`${path}/dashboard`}>
                    <Dashboard />
                </Route>
            </Switch>
        </div>
    );

}

export default AuthenticatedLayout;