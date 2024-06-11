import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';

const AttendanceSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedAttendanceTypes, setSelectedAttendanceTypes] = useState([]);
  const attendanceTypes = ['Asiste', 'Retardo', 'Evación', 'Falla', 'Justificada']; // Assuming attendance types

  const handleSearch = () => {
    // Implement search logic based on searchText and selectedAttendanceTypes
    console.log('Search: ', searchText, selectedAttendanceTypes); // Replace with actual search logic
  };

  const toggleAttendanceType = (type) => {
    const isSelected = selectedAttendanceTypes.includes(type);
    setSelectedAttendanceTypes(
      isSelected
        ? selectedAttendanceTypes.filter((t) => t !== type)
        : [...selectedAttendanceTypes, type]
    );
  };

  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search by course name"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <FlatList
        data={attendanceTypes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleAttendanceType(item)}>
            <Text style={{ borderWidth: 1, padding: 5, marginHorizontal: 5 }}>
              {item} {selectedAttendanceTypes.includes(item) ? '✅' : ''}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal={true}
        style={{ maxHeight: 50 }}
      />
      <Button title="Buscar" onPress={handleSearch} />
    </View>
  );
};

export default AttendanceSearch;
