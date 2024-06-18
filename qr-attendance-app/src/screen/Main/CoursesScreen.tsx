import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const Cursos = () => {
  type Student = {
    Curso: string;
    Documento: string;
    Nombres: string;
    Registro: string;
  };

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('501'); // Estado para almacenar el curso seleccionado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.19:3000/api/estudiantes');
        const data = await response.json();
        setStudents(data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const filteredStudents = students.filter(student => student.Curso === selectedCourse); // Filtra estudiantes por el curso seleccionado

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de cursos</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, selectedCourse === '501' && styles.selectedButton]} 
          onPress={() => setSelectedCourse('501')}
        >
          <Text style={styles.buttonText}>Curso 501</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, selectedCourse === '502' && styles.selectedButton]} 
          onPress={() => setSelectedCourse('502')}
        >
          <Text style={styles.buttonText}>Curso 502</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, selectedCourse === '503' && styles.selectedButton]} 
          onPress={() => setSelectedCourse('503')}
        >
          <Text style={styles.buttonText}>Curso 503</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.Documento}
        renderItem={({ item, index }) => (
          <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.Documento}</Text>
            <Text style={styles.cell}>{item.Nombres}</Text>
            <Text style={styles.cell}>{item.Registro}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#A2CCFF',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#64AAFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  evenRow: {
    backgroundColor: '#fff',
  },
  oddRow: {
    backgroundColor: '#BFDBFE',
  },
  cell: {
    width: '25%',
    textAlign: 'center',
  },
});

export default Cursos;
