import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'; // Importa BarCodeScanner desde expo-barcode-scanner
import ToggleCameraButton from '../../components/ui/Main/Home/ToggleCameraButton';
import CameraView from '../../components/ui/Main/Home/CameraView';
import Spacer from '../../components/ui/Shared/Spacer';
import { useUser } from '../../context/UserContext';

type Student = {
  Administradores: string;
  Curso: string;
  Documento: number;
  Genero: string;
  Nombres: string;
  Registro: string;
  Tipo_de_documento: string;
};

const HomeScreen = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [id, setId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const { user } = useUser();

  useEffect(() => {
    // Puedes realizar alguna acción inicial aquí si es necesario
  }, []);

  const handleToggleCamera = (isActive: boolean) => {
    setIsCameraActive(isActive);
  };

  const handleScanned = ({ data }: { data: string }) => {
    // Maneja los datos escaneados aquí
    console.log(`Código QR escaneado: ${data}`);
  };

  const handleSearch = async () => {
    try {
      // Actualizar el campo Registro a 1
      const newData = {
        Registro: 1
      };

      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      };

      const updateResponse = await fetch(`http://192.168.101.85:3000/api/estudiantes/${id}`, options);
      const updateData = await updateResponse.json();

      if (updateData.success) {
        alert('Registro exitoso');
      } else {
        alert('Error al actualizar el registro');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }

    try {
      const response = await fetch(`http://192.168.101.85:3000/api/estudiantes/${id}`);
      const data = await response.json();
      setStudent(data.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Spacer vertical={20} />

      <View style={styles.header}>
        <Text style={styles.headerText}>Inicio</Text>
        <Text style={styles.headerText2}>Lectura códigos QR</Text>
        <ToggleCameraButton onToggleCamera={handleToggleCamera} />
      </View>

      <View style={styles.profile}>
        <View style={styles.photo} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>{user?.Nombres}</Text>
          <Text style={styles.profilePosition}>{user?.Rol}</Text>
        </View>
      </View>

      <View style={styles.idInputContainer}>
      <TextInput
        value={id}
        onChangeText={(text) => {
        setId(text.replace(/[^0-9]/g, '')); 
        }}
        placeholder="Enter ID"
        style={styles.input}
        keyboardType="numeric"
      />
        <TouchableOpacity style={styles.customButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Entrada al aula</Text>
      </View>

      <Spacer vertical={20} />

      <View style={styles.mainContent}>
        {isCameraActive ? (
          <View style={styles.cameraContainer}>
            <BarCodeScanner
              onBarCodeScanned={isCameraActive ? handleScanned : undefined}
              style={styles.camera}
            />
          </View>
        ) : (
          student && (
            <View style={styles.container2}>
      <Text style={styles.info}>{`Nombre: ${student.Nombres}`}</Text>
      <Text style={styles.info}>{`Documento: ${student.Documento}`}</Text>
      <Text style={styles.info}>{`Curso: ${student.Curso}`}</Text>
      <Text style={styles.info}>{`Registro: ${student.Registro}`}</Text>
    </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 10,
    marginTop: -30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'gray',
  },
  profile: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  photo: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
    marginRight: 16,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePosition: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },
  titleContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 185,
    height: 250,
    marginTop: -150,
  },
  idInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
    flex: 1,
  },
  customButton: {
    backgroundColor: '#2D5DC2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 1,
  },
  buttonText: {
    color: '#FFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container2: {
    marginTop: -250,
    width: 350,
    height: 130,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  info: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  camera: {
    width: 185,
    height: 250,
    marginTop: -20,
  },
});

export default HomeScreen;