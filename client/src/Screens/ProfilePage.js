import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { IP_MACHINE } from '../App.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

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
        setProfileImage(response.data.profileImage); // Supondo que a imagem de perfil é retornada
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

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    formData.append('userId', user._id);

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(`http://${IP_MACHINE}/api/upload`, formData, config);
      return response.data.url;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      Alert.alert('Erro', 'Erro ao fazer upload da imagem. Tente novamente.');
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Limpa o token de autenticação
      navigation.navigate('Login'); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Trate o erro conforme necessário
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity style={styles.logoutButtonContainer} onPress={handleLogout}>
          <Text>
            <MaterialIcons name="logout" size={24} color="black" /> {/* Ícone de logout */}
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
});

export default ProfilePage;

