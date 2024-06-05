// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importe o createBottomTabNavigator
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones do Ionicons
import MapScreen from './Screens/Map'; // 
import ProfileScreen from './Screens/Profile';
import SettingsScreen from './Screens/Settings';
import SignInScreen from './Screens/LoginPage';
import Registration from './Screens/RegistrationPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Crie o BottomTabNavigator

const MainStack = () => (
  <Stack.Navigator initialRouteName="SignIn">
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="Map" component={MapScreen} />
    <Stack.Screen name="Registration" component={Registration} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Map" component={MainStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
