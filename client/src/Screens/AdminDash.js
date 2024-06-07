import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_MACHINE } from '../App.js';

const AdminDash = ({ navigation }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.error('Token não encontrado. Faça login novamente.');
          return;
        }

        const response = await fetch(`http://${IP_MACHINE}/api/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao obter informações do utilizador');
        }

        const userData = await response.json();
        const userIsAdmin = userData.isAdmin;

        setIsAdmin(userIsAdmin);
      } catch (error) {
        console.error('Erro ao verificar o status de administrador:', error);
      }
    };

    checkAdminStatus();
  }, []);

  const handleNavigateToCreatePark = () => {
    navigation.navigate('CreatePark');
  };

  const handleNavigateToManageUsers = () => {
    navigation.navigate('ManageUsers');
  };

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Acesso Restrito</Text>
        <Text style={styles.message}>Desculpa!! Mas não tens permissão para aceder, poêm te a andar!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToCreatePark}>
        <Text style={styles.buttonText}>Criar Parque</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToManageUsers}>
        <Text style={styles.buttonText}>Gerir Utilizadores</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#88d968',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AdminDash;
