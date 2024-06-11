import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { PDFExport, ExcelExport } from 'react-native-export-components'; // Assuming export libraries

const ReportExport = ({ attendanceData }) => {
  const [exportFormat, setExportFormat] = useState('pdf'); // Default to PDF

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      // Generate PDF report using attendanceData
      console.log('Exporting PDF report...'); // Replace with actual export logic
    } else if (exportFormat === 'excel') {
      // Generate Excel report using attendanceData
      console.log('Exporting Excel report...'); // Replace with actual export logic
    }
  };

  return (
    <View>
      <Text>Formato de exportación:</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title="PDF"
          onPress={() => setExportFormat('pdf')}
          style={{ marginHorizontal: 5 }}
          color={exportFormat === 'pdf' ? '#007bff' : '#ccc'}
        />
        <Button
          title="Excel"
          onPress={() => setExportFormat('excel')}
          style={{ marginHorizontal: 5 }}
          color={exportFormat === 'excel' ? '#007bff' : '#ccc'}
        />
      </View>
      <Button title="Exportar" onPress={handleExport} />
    </View>
  );
};

export default ReportExport;
