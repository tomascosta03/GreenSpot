// src/Screens/UserMap.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import Map from './Map';
import './Map.css';
import './UserMap.css';

function UserMap() {
  const history = useHistory();

  return (
    <div className="user-map-container">
      <h1>Mapa de Parques</h1>
      <Map />
      <button className="back-button" onClick={() => history.push('/profile')}>Voltar</button>
    </div>
  );
}

export default UserMap;
