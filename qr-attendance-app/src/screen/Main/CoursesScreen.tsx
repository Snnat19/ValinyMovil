import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

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

        const response = await fetch('http://192.168.101.85:3000/api/estudiantes');
        const data = await response.json();
        setStudents(data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const filteredStudents = students.filter(student => student.Curso === selectedCourse); // Filtra estudiantes por el curso seleccionado

  const createPdf = async () => {
    const fecha = new Date();
    const fechaFormateada = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;
    const pdfFileName = `Registro_de_cursos_${fechaFormateada}.pdf`;

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; }
            .header { font-size: 24px; margin-bottom: 10px; }
            .subheader { font-size: 18px; margin-bottom: 5px; }
            .table { width: 100%; border-collapse: collapse; }
            .table, .table th, .table td { border: 1px solid black; }
            .table th, .table td { padding: 10px; text-align: left; }
          </style>
        </head>
        <body>
          <div>
            <h1 class="header">Lista de Cursos</h1>
            <h2 class="subheader">Fecha: ${fechaFormateada}</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Documento</th>
                  <th>Nombres</th>
                  <th>Registro de Asistencia</th>
                </tr>
              </thead>
              <tbody>
                ${filteredStudents.map((student, index) => `
                  <tr key=${student.Documento}>
                    <td>${index + 1}</td>
                    <td>${student.Documento}</td>
                    <td>${student.Nombres}</td>
                    <td>${student.Registro}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    const newUri = `${FileSystem.documentDirectory}${pdfFileName}`;
    await FileSystem.moveAsync({
      from: uri,
      to: newUri,
    });

    await Sharing.shareAsync(newUri);
  };

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
       {/* Espacio entre la lista y el ícono */}
      <View style={{ height: 20 }} />
      <Text style={styles.title2}>Descarga en:</Text>

{/* Imagen para descargar PDF */}
<TouchableOpacity onPress={createPdf}>
  <Image
    source={require('../../../assets/pdf.png')}
    style={styles.pdfIcon}
  />
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginBottom: 90,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  title2: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
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
  pdfIcon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
});

export default Cursos;
