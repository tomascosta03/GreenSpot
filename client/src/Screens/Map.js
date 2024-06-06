import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_MACHINE } from '../App.js';

function MapScreen() {
  const [parques, setParques] = useState([]);
  const [spots, setSpots] = useState([]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.7399,
    longitude: -25.6687,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchParques = async () => {
      try {
        const response = await axios.get(`http://${IP_MACHINE}/api/parks`);
        console.log('Dados do parque:', response.data);
        setParques(response.data);
      } catch (error) {
        console.error('Erro ao buscar parques:', error.message);
      }
    };

    const fetchSpots = async () => {
      try {
        const response = await axios.get(`http://${IP_MACHINE}/api/spots`);
        console.log('Dados dos spots:', response.data);
        setSpots(response.data);
      } catch (error) {
        console.error('Erro ao buscar spots:', error.message);
      }
    };

    const loadInitialRegion = async () => {
      const savedLocation = await AsyncStorage.getItem('location');
      if (savedLocation) {
        const [latitude, longitude] = savedLocation.split(',').map(Number);
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };

    fetchParques();
    fetchSpots();
    loadInitialRegion();
  }, []);

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
    >
      {parques.map(parque => (
        <Marker
          key={parque._id}
          coordinate={{
            latitude: parque.longitude,
            longitude: parque.latitude,
          }}
        >
          <Image
            source={require('../Assets/Pin.png')}
            style={styles.pinImage}
          />
          <Callout style={styles.callout}>
            <View style={styles.calloutContainer}>
              <Text style={styles.title}>{parque.name}</Text>
              <Text style={styles.info}>Lugares Disponíveis: {parque.emptySpaces}</Text>
              <Text style={styles.info}>Lugares Ocupados: {parque.occupiedSpaces}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
      {spots.map(spot => (
        <Marker
          key={spot._id}
          coordinate={{
            latitude: spot.longitude,
            longitude: spot.latitude,
          }}
        >
          <Image
            source={require('../Assets/Pin.png')}
            style={styles.pinImage}
          />
          <Callout style={styles.callout}>
            <View style={styles.calloutContainer}>
              <Text style={styles.title}>{spot.name}</Text>
              <Text style={styles.info}>Status: {spot.reserved ? 'Reservado' : 'Disponível'}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
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
  callout: {
    minWidth: 250,
    padding: 10,
  },
  calloutContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
});

export default MapScreen;
