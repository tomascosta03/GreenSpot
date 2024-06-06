import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { IP_MACHINE } from '../App.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log("Token recebido:", token);

        if (!token) {
          setError('Token não encontrado. Faça login novamente.');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://${IP_MACHINE}/api/users/me`, config);
        console.log("Dados do utilizador obtidos:", response.data);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setLoading(false);
      } catch (err) {
        console.error('Erro obtendo os dados do utilizador:', err);
        if (err.response && err.response.status === 401) {
          setError('Não autorizado. Faça login novamente.');
          await AsyncStorage.removeItem('token');
        } else {
          setError(err.response ? err.response.data.message : err.message);
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updates = {
        name,
        email,
      };

      const response = await axios.patch(`http://${IP_MACHINE}/api/users/${user._id}`, updates, config);
      console.log("Utilizador atualizado:", response.data);
      Alert.alert('Sucesso', 'Utilizador atualizado com sucesso');
    } catch (error) {
      console.error('Erro atualizando o utilizador:', error);
      Alert.alert('Erro', 'Erro ao atualizar utilizador. Tente novamente.');
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Update Profile" onPress={handleUpdate} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
});

export default ProfilePage;
