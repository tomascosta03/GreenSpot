import React, { useState } from 'react';
import { Text, View } from 'react-native'; // Importar o componente Text do React Native
import './AdminDash.css';

const AdminDash = () => {
  const [selectedItem, setSelectedItem] = useState('dashboard'); // Estado para controlar o item selecionado

  return (
    <View className="container"> {/* Substituir div por View */}
      <aside>
        <div className="top">
          <div className="logo">
            <img src="/Imgs/parking.jpg" alt="teste" width="25" height="25"/>
            <Text style={{ fontSize: 20 }}>Green</Text><Text className="danger" style={{ fontSize: 20 }}>Spot</Text> {/* Usar Text para renderizar texto */}
          </div>
          <div className="close" id="close-btn">
            <Text>close</Text> {/* Usar Text para renderizar texto */}
          </div>
        </div>
        <div className='sidebar'>
          <a href='#' className={selectedItem === 'dashboard' ? 'active' : ''} onClick={() => setSelectedItem('dashboard')}>
            <span className='material-icons-sharp'>grid_view</span>
            <Text>DashBoard</Text> {/* Usar Text para renderizar texto */}
          </a>
        </div>
        <div className='sidebar'>
          <a href='#' className={selectedItem === 'parques' ? 'active' : ''} onClick={() => setSelectedItem('parques')}>
            <span className="material-symbols-outlined">local_parking</span>
            <Text>Parques</Text> {/* Usar Text para renderizar texto */}
          </a>
        </div>
        <div className='sidebar'>
          <a href='#' className={selectedItem === 'utilizadores' ? 'active' : ''} onClick={() => setSelectedItem('utilizadores')}>
            <span className="material-symbols-outlined">group</span>
            <Text>Utilizadores</Text> {/* Usar Text para renderizar texto */}
          </a>
        </div>
        <div className='sidebar'>
          <a href='#' className={selectedItem === 'definicoes' ? 'active' : ''} onClick={() => setSelectedItem('definicoes')}>
            <span className="material-symbols-outlined">settings</span>
            <Text>Definições</Text> {/* Usar Text para renderizar texto */}
          </a>
        </div>
      </aside>

      <main>
        <Text style={{ fontSize: 24 }}>Dashoard</Text> {/* Usar o componente Text para renderizar texto */}
        <View className="date"> {/* Substituir div por View */}
          <input type='date'></input>
        </View>

        <View className="overview"> {/* Substituir div por View */}
          <Text style={{ fontSize: 20 }}>Visão Geral dos Parques</Text> {/* Usar o componente Text para renderizar texto */}
          <View className="park-info"> {/* Substituir div por View */}
            <Text>Total de Parques: 10</Text> {/* Usar o componente Text para renderizar texto */}
            <Text>Parques Ativos: 8</Text> {/* Usar o componente Text para renderizar texto */}
            <Text>Parques Inativos: 1</Text> {/* Usar o componente Text para renderizar texto */}
            <Text>Parques em Manutenção: 1</Text> {/* Usar o componente Text para renderizar texto */}
            <Text>Número de Visitantes: 5000/dia</Text> {/* Usar o componente Text para renderizar texto */}
          </View>
        </View>

        <View className="insights"> {/* Substituir div por View */}
          <View className="sales"> {/* Substituir div por View */}
            <Text>analytics</Text> {/* Usar Text para renderizar texto */}
            <View className="middle"> {/* Substituir div por View */}
              <View className="left"> {/* Substituir div por View */}
                <Text>Total de Parques</Text> {/* Usar Text para renderizar texto */}
                <Text>$25,024</Text> {/* Usar Text para renderizar texto */}
              </View>
              <View className="progress"> {/* Substituir div por View */}
                <svg>
                  <circle cx='38' cy='38' r='36'></circle>
                </svg>
                <Text>0</Text> {/* Usar Text para renderizar texto */}
              </View>
            </View>
          </View>
        </View>
      </main>
    </View>
  );
};

export default AdminDash;
