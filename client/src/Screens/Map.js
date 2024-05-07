import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import "./Map.css"

function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Map
    //Token e cordenadas para começar o mapa na uni dos Açores
      mapboxAccessToken="pk.eyJ1IjoiZmVyb3BlcyIsImEiOiJjbHZ0amdxa3kxYnp3MmxtaGo3bjkzcml3In0.IVlmneQW7Me9kUfvoF6DkQ"
      initialViewState={{
        longitude: -25.6661979,
        latitude: 37.7459205,
        zoom: 16
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {/*1º Parque que tem o nome de Casa do Tomás */}
      <Marker
        longitude={-25.6661979}
        latitude={37.7459205}
        anchor="bottom"
        onClick={() => setShowInfo(true)}
      >
        {showInfo && (
          <Popup
            longitude={-25.6661979}
            latitude={37.7459205}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowInfo(false)}
            anchor="top"
          >
            <div>
              <h2><img src="https://cdn-icons-png.flaticon.com/512/75/75905.png" alt="Icone de casa" style={{ maxWidth: '25px', maxHeight: '25px' }} /> Casa do Tomás</h2>
              <p><img src="https://cdn-icons-png.flaticon.com/512/106/106121.png" alt="Icone de localização" style={{ maxWidth: '15px', maxHeight: '15px' }} /> Rua secreta!</p>
              <p><img src="https://cdn-icons-png.flaticon.com/512/7184/7184066.png" alt="Icone de estacionamento" style={{ maxWidth: '15px', maxHeight: '15px' }} /> Lugares Disponíveis: 1 para o Fanfa</p>
              <p><img src="https://cdn-icons-png.flaticon.com/512/232/232443.png" alt="Icone de carro" style={{ maxWidth: '15px', maxHeight: '15px' }} /> Lugares Ocupados: 1 o Tomás</p>
            </div>
          </Popup>
        )}
        <img
          width={35}
          height={35}
          src="https://w7.pngwing.com/pngs/258/471/png-transparent-car-park-parking-escalator-blue-electronics-text-thumbnail.png"
          alt="Parque"
          style={{ cursor: 'pointer' }}
        />
      </Marker>
    </Map>
  );
}

export default App;
