import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ToggleCameraButton = ({ onToggleCamera }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    setIsToggled(!isToggled);
    onToggleCamera(!isToggled);
  };

  const buttonColor = isToggled ? '#4CAF50' : '#DDD';
  const knobColor = isToggled ? '#FFF' : buttonColor;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>
        {isToggled ? 'On' : 'Off'}
      </Text>
      <TouchableOpacity onPress={toggleButton} style={{ backgroundColor: buttonColor, borderRadius: 50, padding: 5 }}>
        <View style={{ backgroundColor: knobColor, borderRadius: 50, width: 12, height: 12 }} />
      </TouchableOpacity>
    </View>
  );
};

export default ToggleCameraButton;
