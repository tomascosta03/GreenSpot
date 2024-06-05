import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
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
      const response = await axios.post(`http://10.1.60.126:8000/api/users/login`, {
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

        navigation.navigate('Map');
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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
});