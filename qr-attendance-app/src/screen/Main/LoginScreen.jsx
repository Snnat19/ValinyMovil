import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { UserContext } from '../App'; // Importa el contexto

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState(''); 
  const navigation = useNavigation();
  //const { setUserData } = useContext(UserContext); // Usa el contexto

  const handleSubmit = async () => {
    // Datos a enviar
    const data = {
      ID_Admin: usuario,
      password: contraseña,
    };
  
    // Opciones de la solicitud fetch
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  
    // Realizar la solicitud a la API
    try {
      const response = await fetch('http://192.168.1.42:3000/api/administradores/authenticate', options);
      const data = await response.json();

      // Aquí puedes manejar la respuesta de la API
      if (data.success) {
        // Guardar el token en el almacenamiento local
       // await AsyncStorage.setItem('token', data.token);

        // Actualizar los datos del usuario

        /*
        setUserData({
          ID_Admin: usuario,
          password: contraseña,
        });
        */

        // Redirigir al usuario a la página de registros
        navigation.navigate('BottomTabNavigation');
      } else if (data.message) {
        Alert.alert(data.message);
      }
    } catch (error) {
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>DEVIU SYSTEM</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>¡Bienvenido! Es un gusto tenerte de vuelta!</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
        onChangeText={setUsuario}
        value={usuario}
        placeholder="Ingresa tu usuario"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
        onChangeText={setContraseña}
        value={contraseña}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
      />
      <Button
        title="Iniciar sesión"
        onPress={handleSubmit}
      />
    </View>
  );
}

export default Login;
