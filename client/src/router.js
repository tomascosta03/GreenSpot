// router.js

import { createSwitchNavigator } from 'react-navigation';
import { SignedIn } from './SignedIn'; // Importe o componente SignedIn
import { SignedOut } from './SignedOut'; // Importe o componente SignedOut

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};
