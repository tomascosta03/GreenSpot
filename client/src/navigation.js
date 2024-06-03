import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './Screens/LoginPage';
import RegistrationPage from './Screens/RegistrationPage';
import PasswordResetForm from './Screens/Password';
import AdminDash from './Screens/AdminDash';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="PasswordReset" component={PasswordResetForm} />
        <Stack.Screen name="AdminDash" component={AdminDash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
