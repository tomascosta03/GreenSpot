// auth.js

import { AsyncStorage } from 'react-native';

export const USER_KEY = 'auth-demo-key';

export const onSignIn = async (token) => {
    try {
        await AsyncStorage.setItem(USER_TOKEN_KEY, token);
    } catch (error) {
        throw new Error('Erro ao salvar token de usuário:', error);
    }
};

export const onSignOut = async () => {
    try {
      await AsyncStorage.removeItem(USER_TOKEN_KEY);
    } catch (error) {
      throw new Error('Erro ao remover token de usuário:', error);
    }
  };

  export const isSignedIn = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
      return !!token; 
    } catch (error) {
      throw new Error('Erro ao verificar se o usuário está autenticado:', error);
    }
  };
  