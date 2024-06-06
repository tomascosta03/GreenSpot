import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { IP_MACHINE } from '../App.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    console.log("Tentativa de login com o seguinte email:", email);

    try {
      const response = await axios.post(`http://${IP_MACHINE}/api/users/login`, {
        email,
        password,
      });

      setIsLoading(false);

      console.log("Resposta do login:", response);

      if (response.status === 200 && response.data.token) {
        Alert.alert('Login bem-sucedido');

        // Salvar o token no AsyncStorage
        await AsyncStorage.setItem('token', response.data.token);
        console.log("Token guardado:", response.data.token);

        // Navegar para a tela principal, que irá carregar a tab bar
        navigation.reset({
          index: 0,
          routes: [{ name: 'Map' }],
        });
      } else {
        console.log("Login falhado:", response.data.message);
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      setIsLoading(false);
      setError("Erro ao fazer login. Por favor, tente novamente.");
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={[styles.input, { marginTop: -5 }]}
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
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sessão</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={[styles.registerText, { color: '#4CAF50' }]}>Não tem uma conta? Registar</Text>
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
  },
  form: {
    width: '80%',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 10,
  },
});
