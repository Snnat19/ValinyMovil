import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
//import { UserContext } from '../App'; // Importa el contexto

function Cursos() {

  type Student = {
    Curso: string;
    Documento: string;
    Nombres: string;
    Registro: string;
  };
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('501'); // Estado para almacenar el curso seleccionado
 // const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.185.244:3000/api/estudiantes');
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
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.Documento}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    width: '25%',
    textAlign: 'center',
  },
});

export default Cursos;
