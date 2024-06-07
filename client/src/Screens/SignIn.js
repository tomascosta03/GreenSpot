// SignIn.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import { onSignIn } from './auth'; // Importe a função onSignIn

const SignIn = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Sign In Screen</Text>
    <Button
      title="Sign In"
      onPress={() => {
        onSignIn().then(() => navigation.navigate('SignedIn'));
      }}
    />
  </View>
);

export default SignIn;
