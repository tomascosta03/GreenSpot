// src/Screens/Password.js
import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png'; // Importar o logo

function PasswordResetForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password reset requested for email:', email);
  };

  return (
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
    </div>
  );
}

export default PasswordResetForm;
