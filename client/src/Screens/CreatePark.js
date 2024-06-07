import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CreateParkScreen = () => {
  const [parkName, setParkName] = useState('');
  const [location, setLocation] = useState('');

  const handleCreatePark = () => {
    // Lógica para criar o parque
    console.log('Creating park:', parkName, location);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Parque"
        value={parkName}
        onChangeText={setParkName}
      />
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Criar Parque" onPress={handleCreatePark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default CreateParkScreen;
