import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';



interface Estudiante {
  Documento: string;
  Nombres: string;
  Genero: string; 
  Tipo_de_documento: string;
  Curso: string;
  Administradores: string;
  Registro: string;
}

const estados = {
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
        const response = await axios.get('http://192.168.101.85:3000/api/estudiantes');
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
    <View>
      <Text>SpecifReportScreen</Text>
    </View>
  )
}

export default SpecifReportScreen;