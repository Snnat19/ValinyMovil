import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

type Estudiante = {
  Administradores: string;
  Curso: string;
  Documento: number;
  Genero: string;
  Nombres: string;
  Registro: string;
  Tipo_de_documento: string;
};

const estados: {[key: string]: number} = {
  'falla': 0,
  'asiste': 1,
  'retardo': 2,
  'evasion': 3,
  'falla-justificada': 4
};

interface ReporteEspecificoProps {
  setToken: (token: string) => void;
}

const ReporteEspecifico: React.FC<ReporteEspecificoProps> = ({ setToken }) => {
  const [registroSeleccionado, setRegistroSeleccionado] = useState<string | undefined>(undefined);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarEstudiantes = async () => {
      try {
        const response = await fetch("http://192.168.101.85:3000/api/estudiantes");
        const data: Estudiante[] = await response.json();
        console.log("Datos de estudiantes:", data); // Verificar datos de estudiantes recibidos
        setEstudiantes(data);
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
        setError("Error al cargar estudiantes");
      }
    };
  
    cargarEstudiantes();
  }, []);
  
  const filtrarEstudiantes = (tipo: string) => {
    console.log("Tipo seleccionado:", tipo); // Verificar el tipo seleccionado
    return estudiantes.filter(estudiante => estudiante.Registro === tipo);
  };
  
  
  const handleReportTypeClick = (reportType: string) => {
    console.log("Tipo seleccionado:", reportType); // Verificar el tipo seleccionado
    setRegistroSeleccionado(reportType);
    setError(null); // Resetear el error al cambiar de selección
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes Específicos</Text>
      <Text style={styles.subtitle}>Reportes Diarios</Text>
      {Object.keys(estados).map((tipo) => (
        <Button
          key={tipo}
          title={tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('-', ' ')}
          onPress={() => handleReportTypeClick(tipo)}
        />
      ))}
      <Text style={styles.subtitle}>Estudiantes:</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {estudiantes.length === 0 && !error && registroSeleccionado !== undefined && (
        <Text style={styles.text}>No se encontraron estudiantes para el estado seleccionado.</Text>
      )}
      {filtrarEstudiantes(registroSeleccionado).map((estudiante) => (
        <Text key={estudiante.Documento} style={styles.text}>{estudiante.Nombres}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});

export default ReporteEspecifico;
