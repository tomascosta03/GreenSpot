import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        await AsyncStorage.setItem('token', token);
        navigation.navigate('Profile');
      } else {
        setError('Erro ao fazer login. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.response ? error.response.data : error);
      setError('Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Iniciar sessão" onPress={handleSignIn} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationForm')}>
          <Text style={styles.registerText}>Não tem uma conta? Registar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d2f4dd',
  },
  form: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    elevation: 3,
    width: '80%',
    maxWidth: 500,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  registerText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#683cec',
  },
});

export default SignInScreen;
