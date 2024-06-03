// src/Screens/UserInfo.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './UserInfo.css';

function UserInfo() {
  const history = useHistory();
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  return (
    <div className="user-info-container">
      <h1>Informações do Utilizador</h1>
      <div className="user-info-content">
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Adicionar users */}
        <button onClick={() => history.push('/profile')}>Voltar</button>
      </div>
    </div>
  );
}

export default UserInfo;
