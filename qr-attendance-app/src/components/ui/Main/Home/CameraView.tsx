import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'; // Use BarCodeScanner for QR code scanning

const CameraView = ({ isActive, onScanned }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (onScanned) {
      onScanned(data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    isActive ? (
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    ) : (
      <Text style={styles.cameraPlaceholder}>Camera Disabled</Text>
    )
  );
};

const styles = StyleSheet.create({
  cameraPlaceholder: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CameraView;
