import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa os estilos CSS de Leaflet

function MapScreen() {
  useEffect(() => {
    // Cria um mapa Leaflet dentro do elemento com o ID 'map'
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Adiciona um tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }, []);

  return (
    <div id="map" style={{ height: '400px' }}></div>
  );
}

export default MapScreen;
