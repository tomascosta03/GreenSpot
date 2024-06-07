// SignOut.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import { onSignOut } from './auth'; // Importe a função onSignOut

const SignOut = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Sign Out Screen</Text>
    <Button
      title="Sign Out"
      onPress={() => {
        onSignOut().then(() => navigation.navigate('SignedOut'));
      }}
    />
  </View>
);

export default SignOut;
