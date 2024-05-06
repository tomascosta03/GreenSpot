import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './Screens/LoginPage';
import MapPage from './Screens/Map';
import RegistrationPage from './Screens/RegistrationPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/map" component={MapPage} />
        <Route path="/registro" component={RegistrationPage} />
        <Redirect from="/" to="/login" exact />
      </Switch>
    </Router>
  );
}

export default App;
