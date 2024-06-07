import React, { useState } from 'react';
import { Text } from 'react-native';
import './LoginPage.css'; 

function PasswordResetForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Reposição da password solicitada pelo email:', email);
  };

  return (
    <div className="password-reset-form">
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Esqueceu-se da password?</Text> 
      <Text>Por favor introduza o email para redefinir a password.</Text> 
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="email"
            placeholder="Introduza o seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <button type="submit">Redefinir password</button>
        </div>
      </form>
    </div>
  );
}

export default PasswordResetForm;
