import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const StudentRow = ({ course, selected, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontWeight: selected ? 'bold' : 'normal' }}>{course.name}</Text>
    </TouchableOpacity>
  );
};

export default StudentRow;
