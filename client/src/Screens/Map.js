import * as React from 'react';
import Map, { Marker } from 'react-map-gl';

function App() {
  return <Map
    mapboxAccessToken="pk.eyJ1IjoiZmVyb3BlcyIsImEiOiJjbHZ0amdxa3kxYnp3MmxtaGo3bjkzcml3In0.IVlmneQW7Me9kUfvoF6DkQ"
    initialViewState={{
      longitude: -25.6661979,
      latitude: 37.7459205,
      zoom: 16
    }}
    style={{width: "100vw", height: "100vh"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Marker longitude={-25.6661979} latitude={37.7459205} anchor="bottom" >
      <img width={35} height={35} src="https://w7.pngwing.com/pngs/258/471/png-transparent-car-park-parking-escalator-blue-electronics-text-thumbnail.png" />
    </Marker>
  </Map>;
}


export default App;
