import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ToggleCameraButton from '../../components/ui/Main/Home/ToggleCameraButton';
import CameraView from '../../components/ui/Main/Home/CameraView';
import Spacer from '../../components/ui/Shared/Spacer';
import { useUser } from '../../context/UserContext'; // Importar useUser desde el contexto

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
  const { user } = useUser(); // Obtener los datos del usuario del contexto

  useEffect(() => {
    // Puedes realizar alguna acción inicial aquí si es necesario
  }, []);

  const handleToggleCamera = (isActive: boolean) => {
    setIsCameraActive(isActive);
  };

  const handleScanned = (data: { text: string }) => {
    // Maneja los datos escaneados aquí
    console.log(data.text);
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

      const updateResponse = await fetch(`http://192.168.1.10:3000/api/estudiantes/${id}}`, options);
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
      const response = await fetch(`http://192.168.1.10:3000/api/estudiantes/${id}`);
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
        <Text style={styles.headerText}>Lectura códigos QR</Text>
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
          onChangeText={setId}
          placeholder="Ingrese el ID"
          style={styles.input}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Entrada al aula</Text>
      </View>

      <Spacer vertical={20} />

      <View style={styles.mainContent}>
        {isCameraActive ? (
          <View style={styles.cameraContainer}>
            <CameraView isActive={isCameraActive} onScanned={handleScanned} />
          </View>
        ) : (
          student && (
            <View>
              <Text>{`Nombre: ${student.Nombres}`}</Text>
              <Text>{`Documento: ${student.Documento}`}</Text>
              <Text>{`Curso: ${student.Curso}`}</Text>
              <Text>{`Registro: ${student.Registro}`}</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 250,
    height: 250,
    backgroundColor: '#000',
  },
  idInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 8,
    flex: 1,
  },
});

export default HomeScreen;