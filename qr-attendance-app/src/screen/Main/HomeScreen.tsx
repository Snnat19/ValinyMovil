import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ToggleCameraButton from '../../components/ui/Main/Home/ToggleCameraButton';
import CameraView from '../../components/ui/Main/Home/CameraView';
import FormReturn from '../../components/ui/Main/Home/FormReturn';
import Spacer from '../../components/ui/Shared/Spacer';

type Student = {
  Curso: string;
  Documento: string;
  Nombres: string;
  Registro: string;
};

const HomeScreen = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [id, setId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);

  const handleToggleCamera = (isActive) => {
    setIsCameraActive(isActive);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.1.42:3000/api/estudiantes/${id}`);
      const data = await response.json();
      setStudent(data.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  // Aquí puedes usar los datos del estudiante como necesites
  console.log(student);

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
          <Text style={styles.profileName}>Nombre</Text>
          <Text style={styles.profilePosition}>Cargo</Text>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Entrada comedor escolar</Text>
      </View>

      <Spacer vertical={20} />

      <View style={styles.mainContent}>
        {isCameraActive ? (
          <View style={styles.cameraContainer}>
            <CameraView isActive={isCameraActive} />
          </View>
        ) : (
          <View style={styles.idInputContainer}>
            <TextInput
              value={id}
              onChangeText={setId}
              placeholder="Enter ID"
              style={styles.input}
            />
            <Button title="Search" onPress={handleSearch} />
          </View>
        )}
      </View>

      {student && (
        <FormReturn studentData={student} />
      )}
    </View>
  );
};

// ... el resto de tu código


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
