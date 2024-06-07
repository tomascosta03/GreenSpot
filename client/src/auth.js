import { AsyncStorage } from 'react-native';

const Auth = {
  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erro ao obter token de autenticação:', error);
      return null;
    }
  },
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Erro ao definir token de autenticação:', error);
    }
  },
  clearToken: async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Erro ao limpar token de autenticação:', error);
    }
  },
  isAuthenticated: async () => {
    const token = await Auth.getToken();
    return !!token;
  }
};

export default Auth;
