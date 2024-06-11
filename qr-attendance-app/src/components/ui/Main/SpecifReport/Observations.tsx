import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Observations = ({ attendanceData }) => {
  const [observations, setObservations] = useState('');

  const handleAddObservation = (studentId) => {
    // Implement logic to add observation for the given studentId
    console.log('Add observation for:', studentId, observations); // Replace with actual logic
  };

  return (
    <View>
      {attendanceData.map((student) => (
        <View key={student.id}>
          <Text>Estudiante: {student.name}</Text>
          <TextInput
            value={observations}
            onChangeText={(text) => setObservations(text)}
            placeholder="Agregar observación"
            style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
          />
          <Button title="Agregar" onPress={() => handleAddObservation(student.id)} />
        </View>
      ))}
    </View>
  );
};

export default Observations;
