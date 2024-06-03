// src/Screens/Password.js
import React, { useState } from 'react';
<<<<<<< HEAD
import { Text } from 'react-native'; // Importe o componente Text do React Native
import './LoginPage.css'; 
=======
import './LoginPage.css';
import logo from '../assets/logo.png'; // Importar o logo
>>>>>>> 71294935e523aa0e855809b3ac62b52a8d08e76f

function PasswordResetForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password reset requested for email:', email);
  };

  return (
<<<<<<< HEAD
    <div className="password-reset-form">
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Forgot Password?</Text> {/* Use o componente Text para renderizar o título */}
      <Text>Please enter your email address to reset your password.</Text> {/* Use o componente Text para renderizar o texto */}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <button type="submit">Reset Password</button>
        </div>
      </form>
=======
    <div className="container">
      <div className="form">
        <img src={logo} alt="Logo" className="logo" /> {/* Adicionar o logo */}
        <h3 className="header">Esqueci a password</h3>
        <p>Não tem problema! Introduz o teu e-mail para recuperares a tua conta.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="button-field">
            <button type="submit">Enviar Código</button>
          </div>
        </form>
      </div>
>>>>>>> 71294935e523aa0e855809b3ac62b52a8d08e76f
    </div>
  );
}

export default PasswordResetForm;
