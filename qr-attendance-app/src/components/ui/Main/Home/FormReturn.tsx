import React from 'react';
import { View, Text, Button } from 'react-native';

const FormReturn = ({ studentData }) => {
  const { name, document, course, jornada, attendanceType } = studentData;

  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Document: {document}</Text>
      <Text>Course: {course}</Text>
      <Text>Jornada: {jornada}</Text>
      <Text>Attendance Type: {attendanceType}</Text>
      <Button title="Finalize Reading/ID" />
    </View>
  );
};

export default FormReturn;
