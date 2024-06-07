import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { IP_MACHINE } from '../App';

const CreateParkScreen = () => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [emptySpaces, setEmptySpaces] = useState('');
  const [occupiedSpaces, setOccupiedSpaces] = useState('');
  const [isPaid, setIsPaid] = useState('');

  const handleCreatePark = async () => {
    try {
      const response = await axios.post(`http://${IP_MACHINE}/api/parks`, {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        emptySpaces: parseInt(emptySpaces),
        occupiedSpaces: parseInt(occupiedSpaces),
        isPaid: isPaid === 'true' ? true : false,
      });
      console.log('Parque criado:', response.data);

      setName('');
      setLatitude('');
      setLongitude('');
      setEmptySpaces('');
      setOccupiedSpaces('');
      setIsPaid('');
    } catch (error) {
      console.error('Erro ao criar parque:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Criar Parque</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Parque"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Espaços vazios"
          value={emptySpaces}
          onChangeText={setEmptySpaces}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Espaços ocupados"
          value={occupiedSpaces}
          onChangeText={setOccupiedSpaces}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="É pago? (true/false)"
          value={isPaid}
          onChangeText={setIsPaid}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreatePark}>
          <Text style={styles.buttonText}>Criar Parque</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  form: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#88d968',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateParkScreen;
