import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Importando useFocusEffect
import { IP_MACHINE } from '../App.js';

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);

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
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setProfileImage(response.data.profileImage);
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
  }, []);

  // Usando useFocusEffect para chamar fetchUser sempre que a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [fetchUser])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      const uploadUrl = await uploadImage(pickerResult.uri);
      if (uploadUrl) {
        setProfileImage(uploadUrl);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);

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
        profileImage,
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
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedInText}>Você não fez login.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.button}>
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity style={styles.logoutButtonContainer} onPress={handleLogout}>
          <Text>
            <MaterialIcons name="logout" size={24} color="black" />
          </Text>
        </TouchableOpacity>

        {profileImage && (
          <Image
            source={{ uri: `http://${IP_MACHINE}${profileImage}` }}
            style={styles.profileImage}
          />
        )}
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Selecionar Imagem de Perfil</Text>
        </TouchableOpacity>
        {user && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Atualizar Perfil</Text>
            </TouchableOpacity>
          </View>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  profileImage: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: '#88d968',
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#88d968',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  notLoggedInText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfilePage;

