import React, { useEffect, useState, useRef, useContext  } from 'react';
import { View, Text, Button, Alert, FlatList,ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { UserContext } from '../App'; // Importa el contexto

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
  const navigation = useNavigation();
  const [admin, setAdmin] = useState([]);
 // const { userData } = useContext(UserContext);
  const fecha = new Date();
  const fechaFormateada = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;

 // const [token, setToken] = useState(null);

  //console.log(userData.ID_Admin);
/*
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      console.log(token);
    }
  }, [token]);
*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.101.85:3000/api/porcentajes/porcentaje_registros');
        const data = await response.json();
        setStudents(data.data);
        // renderBarChart(response.data.data);
        // renderDonutChart(response.data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
/*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.42:3000/api/administradores/${userData.ID_Admin}`);
        const data = await response.json();
        setAdmin(data.data);
  
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
      fetchData();
    }, []);
*/
  const handleMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleInstructions = () => {
    setShowPdf(true);
    setIsMenuOpen(false);
  };

 /* const exportarAExcel = (datosApi, nombreArchivo) => {
    // Aquí puedes implementar la lógica para exportar a Excel
    // Ten en cuenta que esta funcionalidad puede no estar disponible en React Native
  }; */

  // const renderBarChart = (data) => {
  //   // Aquí puedes implementar la lógica para renderizar el gráfico de barras
  //   // Ten en cuenta que esta funcionalidad puede no estar disponible en React Native
  // };

  // const renderDonutChart = (data) => {
  //   // Aquí puedes implementar la lógica para renderizar el gráfico de dona
  //   // Ten en cuenta que esta funcionalidad puede no estar disponible en React Native
  // };

  if (showPdf) {
    // Aquí puedes implementar la lógica para mostrar el PDF
    // Ten en cuenta que esta funcionalidad puede no estar disponible en React Native
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes Diarios</Text>
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