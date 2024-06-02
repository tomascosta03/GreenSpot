// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Screens/LoginPage';
import RegisterPage from './Screens/RegistrationPage';
import PasswordResetForm from './Screens/Password';
import UserProfile from './Screens/UserProfile';
import UserInfo from './Screens/UserInfo';
import UserMap from './Screens/UserMap';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/registo" component={RegisterPage} />
        <Route path="/password" component={PasswordResetForm} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/info" component={UserInfo} />
        <Route path="/map" component={UserMap} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
