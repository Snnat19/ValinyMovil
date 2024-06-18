import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
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
      const response = await fetch('http://192.168.1.19:3000/api/administradores/authenticate', options);
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

    <View style={styles.container}>
      <View style={styles.formContainer}>
       <Image
        source={require('./../../../assets/logonegro.png')} 
        style={styles.logo}
      />
  <Text style={styles.title}>DEVIU SYSTEM</Text>
  <Text style={styles.subtitle}>¡Bienvenido!</Text>
  <Text style={styles.subtitle}>Es un gusto tenerte de vuelta</Text>
   
  <View style={styles.inputGroup}>
          <Text style={styles.label}>Usuario:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsuario}
            value={usuario}
            placeholder="Ingresa tu usuario"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setContraseña}
            value={contraseña}
            placeholder="Ingresa tu contraseña"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
</View>
</View>
    
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
    padding: 20, 
  },
  formContainer: {
    backgroundColor: 'white', 
    padding: 20,
    borderRadius: 10,
    width: '100%', 
    maxWidth: 400, 
    alignItems: 'center', 
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 10, 
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20, 
  },
  inputGroup: {
    marginBottom: 5,
    width: '100%',
    maxWidth: 300,
  },
  label: {
    fontSize: 12,
    color: '#0E0F2A', 
    marginBottom: 5,
  },
    input: {
      height: 40,
      borderColor: '#D8D8D8',
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
      width: '100%',
      maxWidth: 300,
      borderRadius: 10, 
  },
  button: {
    width: '100%',
    maxWidth: 300,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
export default Login;
