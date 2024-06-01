// AdminDash.js

import React, { useState } from 'react';
import './AdminDash.css';

const AdminDash = () => {
  const [selectedItem, setSelectedItem] = useState('dashboard'); // Estado para controlar o item selecionado

  return (
    <div className="container">
      <aside>
        <div className="top">
          <div className="logo">
            <img src="/Imgs/parking.jpg" alt="teste" width="25" height="25"/>
            <h2>Green<span className="danger"></span>Spot</h2>
          </div>
          <div className="close" id="close-btn">
            <span className="material-icons-sharp">close</span>
          </div>
        </div>
        <div className='sidebar'>
          <a href='#' className={selectedItem === 'dashboard' ? 'active' : ''} onClick={() => setSelectedItem('dashboard')}>
            <span className='material-icons-sharp'>grid_view</span>
            <h3>DashBoard</h3>
          </a>
        </div>
        <div className='sidebar'>
          <a href='#' className={selectedItem === 'parques' ? 'active' : ''} onClick={() => setSelectedItem('parques')}>
            <span className="material-symbols-outlined">local_parking</span>
            <h3>Parques</h3>
          </a>
        </div>
        <div className='sidebar'>
          <a href='#' className={selectedItem === 'utilizadores' ? 'active' : ''} onClick={() => setSelectedItem('utilizadores')}>
            <span className="material-symbols-outlined">group</span>
            <h3>Utilizadores</h3>
          </a>
        </div>
        <div className='sidebar'>
          <a href='#' className={selectedItem === 'definicoes' ? 'active' : ''} onClick={() => setSelectedItem('definicoes')}>
            <span className="material-symbols-outlined">settings</span>
            <h3>Definições</h3>
          </a>
        </div>
      </aside>

      <main>
        <h1>Dashoard</h1>
        <div className="date">
          <input type='date'></input>
        </div>

        <div className="overview">
          <h2>Visão Geral dos Parques</h2>
          <div className="park-info">
            <div>Total de Parques: 10</div>
            <div>Parques Ativos: 8</div>
            <div>Parques Inativos: 1</div>
            <div>Parques em Manutenção: 1</div>
            <div>Número de Visitantes: 5000/dia</div>
          </div>
        </div>

        <div className="insights">
          <div className="sales">
            <span className="material-icons-sharp">analytics</span>
            <div className="middle">
              <div className="left">
                <h3>Total de Parques</h3>
                <h1>$25,024</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx='38' cy='38' r='36'></circle>
                </svg>
                <div className="number"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDash;
