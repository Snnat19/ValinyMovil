import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

import { FaBars } from 'react-icons/fa';

interface Estudiante {
  Documento: string;
  Nombres: string;
  Genero: string;
  Tipo_de_documento: string;
  Curso: string;
  Administradores: string;
  Registro: string;
}

const estados: { [key: string]: string } = {
  'falla': 'Falla',
  'asiste': 'Asiste',
  'retardo': 'Retardo',
  'evasion': 'Evacion',
  'falla-justificada': 'Justificada'
};

interface ReporteEspecificoProps {
  setToken: (token: string | null) => void;
}

const ReporteEspecifico: React.FC<ReporteEspecificoProps> = ({ setToken }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState('');
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Estudiante[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarEstudiantes = async () => {
      try {
        const response = await axios.get('http://192.168.101.79:3000/api/estudiantes');

        console.log('Datos de estudiantes:', response.data);
        setEstudiantes(response.data.data);
      } catch (error) {
        console.error('Error al cargar estudiantes:', error);
        setError('Error al cargar estudiantes');
      }
    };

    cargarEstudiantes();
  }, []);

  useEffect(() => {
    if (Array.isArray(estudiantes) && registroSeleccionado) {
      const studentsFilteredByStatus = estudiantes.filter(estudiante => {
        console.log('Filtrando estudiante:', estudiante);
        return estudiante.Registro === estados[registroSeleccionado];
      });
      console.log('Estudiantes filtrados:', studentsFilteredByStatus);
      setFilteredStudents(studentsFilteredByStatus);
    } else {
      setFilteredStudents([]);
    }
  }, [estudiantes, registroSeleccionado]);

  const handleMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleInstructions = () => {
    setShowPdf(true);
    closeMenu();
  };

  const handleReportTypeClick = (tipo: string) => {
    setRegistroSeleccionado(tipo);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reportes Específicos</Text>
      <Text style={styles.title}>Reportes Diarios</Text>
      {Object.keys(estados).map(tipo => (
        <TouchableOpacity key={tipo} style={styles.listItem} onPress={() => handleReportTypeClick(tipo)}>
          <View style={[styles.radio, registroSeleccionado === tipo && styles.radioSelected]} />
          <Text style={registroSeleccionado === tipo ? styles.selectedText : styles.text}>{estados[tipo]}</Text>
        </TouchableOpacity>
      ))}
      
      <View style={styles.studentsContainer}>
        <Text style={styles.studentsHeader}>Estudiantes:</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        {filteredStudents.length === 0 && !error && (
          <Text style={styles.noStudents}>No se encontraron estudiantes para el estado seleccionado.</Text>
        )}
        
        {/* Envuelve la FlatList en ScrollView con nestedScrollEnabled */}
        <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
          <FlatList
            data={filteredStudents}
            keyExtractor={(item) => item.Documento}
            renderItem={({ item, index }) => (
              <View style={[styles.studentRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={styles.studentCell}>{index + 1}</Text>
                <Text style={styles.studentCell}>{item.Documento}</Text>
                <Text style={styles.studentCell}>{item.Nombres}</Text>
                <Text style={styles.studentCell}>{item.Tipo_de_documento}</Text>
                <Text style={styles.studentCell}>{item.Curso}</Text>
              </View>
            )}
            ListHeaderComponent={() => (
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Número</Text>
                <Text style={styles.headerCell}>Documento</Text>
                <Text style={styles.headerCell}>Nombres</Text>
                <Text style={styles.headerCell}>Tipo de documento</Text>
                <Text style={styles.headerCell}>Curso</Text>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: -10,
    marginBottom: 45,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#BFDBFE',
    color: '#4B5563',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  title2: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#BFDBFE',
    borderColor: '#BFDBFE',
  },
  text: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    color: '#3B82F6',
  },
  studentsContainer: {
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    backgroundColor: '#FFFFFF',
    flex: 1, 
  },
  studentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  noStudents: {
    color: '#6B7280',
  },
  studentRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  evenRow: {
    backgroundColor: '#F3F4F6',
  },
  oddRow: {
    backgroundColor: '#BFDBFE',
  },
  studentCell: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 8,
    flexWrap: 'wrap',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#BFDBFE',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B5563',
    paddingHorizontal: 8,
    flexWrap: 'wrap',
  },
  scrollView: {
    flex: 1, 
  },
});

export default ReporteEspecifico;