import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './src/navigations/Stack/BottomTabNavigation';
import Login from './src/screen/Main/LoginScreen';
import { UserProvider } from './src/context/UserContext'; // Importar el proveedor de contexto de usuario

const Stack = createStackNavigator();

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
