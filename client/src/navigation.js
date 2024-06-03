import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './LoginPage';
import MapPage from './MapPage';
import RegistrationPage from './RegistrationPage';
import PasswordResetForm from './PasswordResetForm';
import AdminDash from './AdminDash';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="PasswordReset" component={PasswordResetForm} />
        <Stack.Screen name="AdminDash" component={AdminDash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
