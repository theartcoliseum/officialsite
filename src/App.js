import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { AuthContextCreator } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  
  return (
    <div className="App">
      <AuthContextCreator>
        <Router>
        <Header />
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
