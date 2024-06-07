import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_MACHINE } from '../App';

const ManageUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const tokenFromStorage = await AsyncStorage.getItem('token');
        console.log("Token recebido:", tokenFromStorage);
        setToken(tokenFromStorage);
      } catch (error) {
        console.error('Erro recebendo o token do AsyncStorage:', error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`http://${IP_MACHINE}/API/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            throw new Error('Não Autorizado');
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro buscando os utilizadores:', error);
          setError('Ocorreu um erro ao buscar os utilizadores. Por favor, tente novamente mais tarde.');
          setLoading(false);
        });
    }
  }, [token]);

  const handleDeleteUser = (userId) => {
    fetch(`http://${IP_MACHINE}/API/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error('Não Autorizado');
        }
        return response.json();
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.error('Erro eliminando utilizador:', error);
      });
  };

  if (!token) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item.name}</Text>
            <Text style={styles.userText}>{item.email}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleDeleteUser(item._id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#88d968',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ManageUsersScreen;
