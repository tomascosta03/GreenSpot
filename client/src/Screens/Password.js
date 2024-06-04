// src/Screens/Password.js
import React, { useState } from 'react';
import { Text } from 'react-native'; // Importe o componente Text do React Native
import './LoginPage.css'; 

function PasswordResetForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password reset requested for email:', email);
  };

  return (
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
    </div>
  );
}

export default PasswordResetForm;
