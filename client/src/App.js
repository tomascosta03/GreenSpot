import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './Screens/Map';
import ProfileScreen from './Screens/ProfilePage';
import SettingsScreen from './Screens/Settings';
import SignInScreen from './Screens/LoginPage';
import ManageUsersScreen from './Screens/ManageUsers';
import Registration from './Screens/RegistrationPage';
import CreateParkScreen from './Screens/CreatePark';

import AdminScreen from './Screens/AdminDash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const IP_MACHINE = "10.1.60.126:8000";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Erro ao obter o token do AsyncStorage:', error);
      }
      setLoading(false);
    };

    getToken();
  }, []);

  const handleLogin = async (newToken) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Erro ao salvar o token no AsyncStorage:', error);
    }
  };

  const MainStack = () => (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageUsers"
        component={ManageUsersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePark"
        component={CreateParkScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );

  const AuthStack = () => (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
        initialParams={{ handleLogin }}
      />
    </Stack.Navigator>
  );

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Map') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Admin') {
                iconName = focused ? 'construct' : 'construct-outline';
              } else if (route.name === 'SignIn') {
                iconName = focused ? 'log-in' : 'log-in-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name="SignIn"
            component={AuthStack}
            options={{ headerShown: false, tabBarLabel: 'Login' }}
          />
          <Tab.Screen
            name="Map"
            component={MainStack}
            options={{ headerShown: false, tabBarLabel: 'Mapa' }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false, tabBarLabel: 'Perfil' }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false, tabBarLabel: 'Definições' }}
          />
          <Tab.Screen
            name="Admin"
            component={AdminScreen}
            options={{ headerShown: false, tabBarLabel: 'Admin' }}
          />


        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
});

export default App;
