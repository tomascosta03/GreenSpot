import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';

const ManageUsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Lógica para buscar usuários da API ou banco de dados
    const fetchedUsers = [
      { id: '1', name: 'User 1', email: 'user1@example.com' },
      { id: '2', name: 'User 2', email: 'user2@example.com' },
      // Mais usuários
    ];
    setUsers(fetchedUsers);
  }, []);

  const handleDeleteUser = (userId) => {
    // Lógica para deletar usuário
    console.log('Deleting user:', userId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button
              title="Delete"
              onPress={() => handleDeleteUser(item.id)}
            />
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
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default ManageUsersScreen;
