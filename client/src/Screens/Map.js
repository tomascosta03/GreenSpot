import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import './Map.css';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.7459205,
    longitude: -25.6661979,
    zoom: 16,
  });

  const [parques, setParques] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/parks')
      .then(response => {
        setParques(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar parques:', error);
      });
  }, []);

  return (
    <Map
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiZmVyb3BlcyIsImEiOiJjbHZ0amdxa3kxYnp3MmxtaGo3bjkzcml3In0.IVlmneQW7Me9kUfvoF6DkQ"
      onViewportChange={viewport => setViewport(viewport)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {parques.length > 0 && parques.map(parque => (
        <Marker
          key={parque._id}
          longitude={parque.longitude}
          latitude={parque.latitude}
          anchor="bottom"
        >
          <img
            width={35}
            height={35}
            src="https://w7.pngwing.com/pngs/258/471/png-transparent-car-park-parking-escalator-blue-electronics-text-thumbnail.png"
            alt="Parque"
            style={{ cursor: 'pointer' }}
          />
          <Popup
            longitude={parque.longitude}
            latitude={parque.latitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
          >
            <div>
              <h2>{parque.nome}</h2>
              <p>Morada: {parque.morada}</p>
              <p>Lugares Disponíveis: {parque.lugaresDisponiveis}</p>
              <p>Lugares Ocupados: {parque.lugaresOcupados}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
}

export default App;
