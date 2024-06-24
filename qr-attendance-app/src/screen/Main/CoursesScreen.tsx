
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
const Cursos = () => {
  type Student = {
    Curso: string;
    Documento: string;
    Nombres: string;
    Registro: string;
  };

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('501');
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [editStudentStatus, setEditStudentStatus] = useState<string>('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.2.103:3000/api/estudiantes');
      const data = await response.json();
      setStudents(data.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredStudents = students.filter(student => student.Curso === selectedCourse);

  const handleEditStudentClick = (student: Student) => {
    setStudentToEdit(student);
    setEditStudentStatus(student.Registro);
  };

  const handleUpdateStudent = async () => {
    if (!studentToEdit) return;

    const updatedStudentData = { Registro: editStudentStatus };

    try {
      const response = await fetch(`http://192.168.2.103:3000/api/estudiantes/${studentToEdit.Documento}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudentData),
      });

      if (response.ok) {
        await fetchData(); // Refetch the students after update
        setStudentToEdit(null);
        setEditStudentStatus('');
      } else {
        console.error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student: ', error);
    }
  };

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
      <View style={styles.contentContainer}>
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.Documento}
          renderItem={({ item, index }) => (
            <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
              <Text style={[styles.cell, styles.cellNumber]}>{index + 1}</Text>
              <Text style={styles.cell}>{item.Documento}</Text>
              <Text style={styles.cell}>{item.Nombres}</Text>
              {studentToEdit && studentToEdit.Documento === item.Documento ? (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={editStudentStatus}
                    style={styles.picker}
                    onValueChange={(itemValue) => setEditStudentStatus(itemValue)}
                  >
                    <Picker.Item label="Falla" value="0" />
                    <Picker.Item label="Asiste" value="1" />
                    <Picker.Item label="Retardo" value="2" />
                    <Picker.Item label="Evacion" value="3" />
                    <Picker.Item label="Falla Justificada" value="4" />
                  </Picker>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleUpdateStudent}
                  >
                    <Text style={styles.saveButtonText}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.cell}>{item.Registro}</Text>
              )}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditStudentClick(item)}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Text style={styles.title2}>Descarga en:</Text>
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
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 55,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 0,
    textAlign: 'center',
  },
  title2: {
    fontSize: 14,
    marginBottom: 1,
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
    paddingVertical: 10,
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
    width: '20%',
    textAlign: 'center',
    paddingVertical: 5,
  },
  cellNumber: {
    width: '10%',
  },
  editButton: {
    backgroundColor: '#64AAFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  picker: {
    width: '70%',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  pdfIcon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default Cursos;
