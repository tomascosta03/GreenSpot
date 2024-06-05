import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';

function MapScreen() {
  const [parques, setParques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParques = async () => {
      try {
        const response = await axios.get('http://192.168.1.76:8000/api/parks');
        console.log('Dados do parque:', response.data);
        setParques(response.data);
      } catch (error) {
        console.error('Erro ao buscar parques:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParques();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.7399,
        longitude: -25.6687,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {parques.map(parque => {
        console.log(`Renderizando pin para: ${parque.name}, Latitude: ${parque.latitude}, Longitude: ${parque.longitude}`);
        return (
          <Marker
            key={parque._id}
            coordinate={{
              latitude: parque.latitude,
              longitude: parque.longitude,
            }}
          >
            <Image
              source={require('../Assets/Pin.png')}
              style={styles.pinImage}
            />
            <Callout>
              <Text style={styles.title}>{parque.name}</Text>
              <Text style={styles.info}>Lugares Disponíveis: {parque.emptySpaces}</Text>
              <Text style={styles.info}>Lugares Ocupados: {parque.occupiedSpaces}</Text>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pinImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 12,
    marginBottom: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
