// SignUp.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const SignUp = ({ navigation }) => {
  return (
    <View>
      <Text>SignUp Screen</Text>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

export default SignUp;
