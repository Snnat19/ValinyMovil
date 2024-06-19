import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

type Student = {
  Asistencia: number;
  Falla: number;
  Retardo: number;
  Evasion: number;
  Falla_Justificada: number;
};

const Reportes = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.42:3000/api/porcentajes/porcentaje_registros');
        const data = await response.json();
        setStudents(data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

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
            <h1 class="header">Reportes Diarios</h1>
            <h2 class="subheader">Fecha: ${fechaFormateada}</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Propiedad</th>
                  <th>Asistencia</th>
                  <th>Falla</th>
                  <th>Retardo</th>
                  <th>Evasion</th>
                  <th>Falla Just</th>
                </tr>
              </thead>
              <tbody>
                ${students.map((student, index) => `
                  <tr key=${index}>
                    <td>Valor</td>
                    <td>${student.Asistencia}</td>
                    <td>${student.Falla}</td>
                    <td>${student.Retardo}</td>
                    <td>${student.Evasion}</td>
                    <td>${student.Falla_Justificada}</td>
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
      <Text style={styles.title}>Reportes Diarios</Text>
      <Button title="Descargar PDF" onPress={createPdf} />
      <ScrollView horizontal>
        <View style={styles.column}>
          <Text style={styles.header}>Propiedad</Text>
          <Text style={styles.cell}>Asistencia</Text>
          <Text style={styles.cell}>Falla</Text>
          <Text style={styles.cell}>Retardo</Text>
          <Text style={styles.cell}>Evasion</Text>
          <Text style={styles.cell}>Falla Just</Text>
        </View>
        {students.map((student, index) => (
          <View key={index} style={styles.column}>
            <Text style={styles.header}>Valor</Text>
            <Text style={styles.cell}>{student.Asistencia}</Text>
            <Text style={styles.cell}>{student.Falla}</Text>
            <Text style={styles.cell}>{student.Retardo}</Text>
            <Text style={styles.cell}>{student.Evasion}</Text>
            <Text style={styles.cell}>{student.Falla_Justificada}</Text>
          </View>
        ))}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    width: '100%', // Cambia esto
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    width: '100%', // Cambia esto
    textAlign: 'center',
  },
});

export default Reportes;
