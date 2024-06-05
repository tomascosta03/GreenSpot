// Settings.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [location, setLocation] = useState('37.7399,-25.6687'); // Localização predefinida
  const [radius, setRadius] = useState('50');
  const [mapVisible, setMapVisible] = useState(false);
  const [tempLocation, setTempLocation] = useState({ latitude: 37.7399, longitude: -25.6687 });

  useEffect(() => {
    const loadSettings = async () => {
      const savedLocation = await AsyncStorage.getItem('location');
      if (savedLocation) {
        setLocation(savedLocation);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    if (isNotificationsEnabled) {
      requestNotificationPermission();
    } else {
      cancelAllNotifications();
    }
  }, [isNotificationsEnabled]);

  const requestNotificationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'A permissão para notificações é necessária para ativar as notificações.');
      setIsNotificationsEnabled(false);
    }
  };

  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert('Notificações desativadas', 'Todas as notificações foram desativadas.');
  };

  const toggleNotifications = (value) => {
    setIsNotificationsEnabled(value);
    if (value) {
      requestNotificationPermission();
    } else {
      cancelAllNotifications();
    }
  };

  const saveDefaultLocation = async () => {
    const loc = `${tempLocation.latitude},${tempLocation.longitude}`;
    setLocation(loc); // Atualiza a localização predefinida
    await AsyncStorage.setItem('location', loc);
    setMapVisible(false);
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setTempLocation({ latitude, longitude });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Notificações</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
          thumbColor={isNotificationsEnabled ? '#88d968' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#88d968' }}
        />
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Localização Predefinida</Text>
        <TouchableOpacity onPress={() => setMapVisible(true)} style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Selecionar no Mapa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Raio de Procura (km)</Text>
        <TextInput
          style={styles.input}
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionText} onPress={() => Alert.alert("Aviso", "O GreenSpot é uma aplicação dedicada a detetar lugares e parques livres de forma sustentável. Para que o seu tempo de procura seja menor. Ajuda-nos a criar um ambiente mais verde para todos nós!")}>Sobre</Text>
      </TouchableOpacity>

      {mapVisible && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: tempLocation.latitude,
              longitude: tempLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            <Marker coordinate={tempLocation} />
          </MapView>
          <TouchableOpacity onPress={saveDefaultLocation} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvar Localização</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMapVisible(false)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#88d968',
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 20,
  },
  mapButton: {
    backgroundColor: '#88d968',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  map: {
    width: '90%',
    height: '70%',
  },
  saveButton: {
    backgroundColor: '#88d968',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
