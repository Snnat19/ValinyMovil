import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ToggleCameraButton from '../../components/ui/Main/Home/ToggleCameraButton';
import CameraView from '../../components/ui/Main/Home/CameraView';
import FormReturn from '../../components/ui/Main/Home/FormReturn';
import Spacer from '../../components/ui/Shared/Spacer';

const HomeScreen = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [studentData, setStudentData] = useState<null | object>(null);
  const [id, setId] = useState('');

  const handleToggleCamera = (isActive) => {
    setIsCameraActive(isActive);
    setStudentData(null);
  };

  const handleScannedData = (data) => {
    setStudentData({
      name: 'John Doe',
      document: data,
      course: 'Course A',
      jornada: 'Morning',
      attendanceType: 'Present',
    });
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
            <CameraView isActive={isCameraActive} onScanned={handleScannedData} />
          </View>
        ) : (
          <View style={styles.idInputContainer}>
            <TextInput
              value={id}
              onChangeText={setId}
              placeholder="Enter ID"
              style={styles.input}
            />
            <Button title="Search" onPress={() => handleScannedData(id)} />
          </View>
        )}
      </View>

      {studentData && (
        <FormReturn studentData={studentData} />
      )}
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
