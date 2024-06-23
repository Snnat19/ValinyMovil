import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { StackedBarChart } from 'react-native-chart-kit';

type Student = {
  Asistencia: number;
  Falla: number;
  Retardo: number;
  Evasion: number;
  Falla_Justificada: number;
};

const Reportes = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.101.85:3000/api/porcentajes/porcentaje_registros');
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

  if (students.length === 0) {
    return <Text>Cargando datos...</Text>;
  }

  const chartData = {
    labels: students.map((_, index) => `Est${index + 1}`),
    legend: ['Asistencia', 'Falla', 'Retardo', 'Evasion', 'Falla Just'],
    data: [
      students.map(student => student.Asistencia),
      students.map(student => student.Falla),
      students.map(student => student.Retardo),
      students.map(student => student.Evasion),
      students.map(student => student.Falla_Justificada),
    ],
    barColors: ['#2E95CD', '#2E95CD', '#2E95CD', '#2E95CD', '#2E95CD'], // Colors for each category
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes Diarios</Text>
      <ScrollView horizontal={true}>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.headerCell}>Propiedad</Text>
              <Text style={styles.headerCell}>Valor</Text>
            </View>
            {students.map((student, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={styles.cell}>Asistencia</Text>
                <Text style={styles.cell}>{student.Asistencia}</Text>
              </View>
            ))}
            {students.map((student, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={styles.cell}>Falla</Text>
                <Text style={styles.cell}>{student.Falla}</Text>
              </View>
            ))}
            {students.map((student, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={styles.cell}>Retardo</Text>
                <Text style={styles.cell}>{student.Retardo}</Text>
              </View>
            ))}
            {students.map((student, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={styles.cell}>Evasion</Text>
                <Text style={styles.cell}>{student.Evasion}</Text>
              </View>
            ))}
            {students.map((student, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={styles.cell}>Falla Justificada</Text>
                <Text style={styles.cell}>{student.Falla_Justificada}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <StackedBarChart
    
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        data={chartData}
        width={Dimensions.get("window").width - 30}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#f0f0f0", // Light gray background
          backgroundGradientTo: "#f0f0f0", // Light gray background
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
          barPercentage: 1,
        }}
        yAxisLabel=""
        yAxisSuffix=""
      />

      <View style={{ height: 20 }} />
      <Text style={styles.title3}>Descarga en:</Text>

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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 90,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  title3: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
  },
  tableContainer: {
    width: Dimensions.get('window').width - 40,
    maxHeight: 200,
  },
  table: {
    width: '100%',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5D5',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#BFDBFE',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  evenRow: {
    backgroundColor: '#fff',
  },
  oddRow: {
    backgroundColor: '#BFDBFE',
  },
  pdfIcon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
});

export default Reportes;
