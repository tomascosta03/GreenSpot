import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapScreen from './Screens/Map';
import ProfileScreen from './Screens/ProfilePage';
import SettingsScreen from './Screens/Settings';
import SignInScreen from './Screens/LoginPage';
import Registration from './Screens/RegistrationPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const IP_MACHINE = "192.168.1.76:8000";

const AuthStack = () => (
  <Stack.Navigator initialRouteName="SignIn">
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Registration"
      component={Registration}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MainTab = () => (
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
      name="Map"
      component={MapScreen}
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
  </Tab.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token); // Se token existe, autenticação está feita
    };

    checkAuthStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" />
        {isAuthenticated ? <MainTab /> : <AuthStack />}
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
