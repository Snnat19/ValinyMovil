// App.tsx

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './src/navigations/Stack/BottomTabNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );
}
