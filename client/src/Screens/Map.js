import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView, { Marker, Popup } from 'react-native-maps';
import axios from 'axios';

function MapScreen() {
  const [parques, setParques] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/parks')
      .then(response => {
        console.log('Dados do parque:', response.data);
        setParques(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar parques:', error);
      });
  }, []);

  console.log('Parques:', parques);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.7459205,
        longitude: -25.6661979,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {parques.map(parque => (
        <Marker
          key={parque._id}
          coordinate={{
            latitude: parque.latitude,
            longitude: parque.longitude,
          }}
        >
          <Popup>
            <Text>
              <Text style={styles.title}>{parque.nome}</Text>
              <Text style={styles.info}>Morada: {parque.morada}</Text>
              <Text style={styles.info}>Lugares Disponíveis: {parque.lugaresDisponiveis}</Text>
              <Text style={styles.info}>Lugares Ocupados: {parque.lugaresOcupados}</Text>
            </Text>
          </Popup>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontWeight: 'bold',
  },
  info: {
    marginBottom: 5,
  },
});

export default MapScreen;
