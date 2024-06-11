import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ToggleCameraButton from './ToggleCameraButton';
import CameraView from './CameraView';

const Form = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [id, setId] = useState('');

  const handleToggleCamera = (isActive) => {
    setIsCameraActive(isActive);
  };

  const handleScannedData = (data) => {
    // Handle the scanned QR code data here (e.g., set the ID)
    setId(data);
  };

  return (
    <View>
      <ToggleCameraButton onToggleCamera={handleToggleCamera} />
      {isCameraActive ? (
        <CameraView isActive={isCameraActive} onScanned={handleScannedData} />
      ) : (
        <View>
          <TextInput
            value={id}
            onChangeText={setId}
            placeholder="Enter ID (or scan QR code)"
            style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
          />
          <Button title="Search" disabled={!id} /> {/* Enable button only if ID is present */}
        </View>
      )}
    </View>
  );
};

export default Form;
