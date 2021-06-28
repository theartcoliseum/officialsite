import React, {useContext} from "react";
import {
    Route,
    Redirect
  } from "react-router-dom";

import { AuthContext } from './context/AuthContext';


function PrivateRoute({ children, ...rest }) {
    const {user} = useContext(AuthContext);
    return (
        <Route
        {...rest}
        render={({ location }) =>
          !!user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;