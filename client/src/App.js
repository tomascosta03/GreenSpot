<<<<<<< HEAD
// App.js

import React from 'react';
import Navigation from './navigation';

const App = () => {
  return <Navigation />;
};
=======
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
>>>>>>> 71294935e523aa0e855809b3ac62b52a8d08e76f

export default App;
