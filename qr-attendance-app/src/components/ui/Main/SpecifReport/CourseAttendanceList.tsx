import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { StudentRow } from './StudentRow';

const CourseAttendanceList = ({ selectedCourse, setSelectedCourse }) => {
  const courses = /* Fetch or mock course data */;

  return (
    <FlatList
      data={courses}
      renderItem={({ item }) => (
        <StudentRow
          course={item}
          selected={item.name === selectedCourse}
          onSelect={() => setSelectedCourse(item.name)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CourseAttendanceList;
