import React, {useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { AuthContextCreator, AuthContext } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

import Header from './components/Header';
import Footer from './components/Footer';
// import Spinner from './components/Spinner';
import HomePage from './pages/HomePage';

function App() {

  // const {isLoading} = useContext(AuthContext);
  
  return (
    <div className="App">
      <AuthContextCreator>
        <Router>
        <Header />
        {/* <Spinner show={isLoading} /> */}
          <div>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <PrivateRoute path='/protected'>
                <AuthenticatedLayout />
              </PrivateRoute>
            </Switch>
          </div>
          <Footer />
        </Router>

      </AuthContextCreator>
    </div>
  );
}

export default App;
