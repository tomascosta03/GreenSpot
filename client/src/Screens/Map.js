import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiZmVyb3BlcyIsImEiOiJjbHZ0amdxa3kxYnp3MmxtaGo3bjkzcml3In0.IVlmneQW7Me9kUfvoF6DkQ"
      initialViewState={{
        longitude: -25.6661979,
        latitude: 37.7459205,
        zoom: 16
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
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
              <h2>Casa do Tomás</h2>
              <p>Rua secreta!</p>
              <p>Lugares Disponíveis: 1 para o Fanfa</p>
              <p>Lugares Ocupados: 1 o Tomás</p>
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
