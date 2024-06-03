import React, { useState } from 'react';
<<<<<<< HEAD
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
=======
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import logo from '../assets/logo.png';
>>>>>>> 71294935e523aa0e855809b3ac62b52a8d08e76f

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
<<<<<<< HEAD

  const handleSignIn = async () => {
    setError('');

    try {
=======
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      console.log('Enviando dados de login:', { email, password });
>>>>>>> 71294935e523aa0e855809b3ac62b52a8d08e76f
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email,
        password,
      });
<<<<<<< HEAD

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
=======
      console.log('Resposta do servidor:', response);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        history.push('/profile');
      } else {
        setError('Failed to login. Please try again.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.response ? error.response.data : error);
      setError('Failed to login. Please try again.');
>>>>>>> 71294935e523aa0e855809b3ac62b52a8d08e76f
    }
  };



  return (
<<<<<<< HEAD
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
=======
    <section className="container">
      <div className="form">
        <img src={logo} alt="Logo" className="logo" />
        <div className="form-content">
          <header className="header">Bem-vindo de volta!</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="email"
                placeholder="Introduza o email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Introduza a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="button-field">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="form-link">
            <span>Não tem conta? <a href="/registo">Registar</a></span>
          </div>
        </div>
      </div>
    </section>
>>>>>>> 71294935e523aa0e855809b3ac62b52a8d08e76f
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
