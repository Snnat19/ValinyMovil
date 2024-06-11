import React from 'react';
import { View } from 'react-native';

const Spacer = ({ vertical = 0, horizontal = 0 }) => {
  return (
    <View style={{
      height: vertical ? vertical : 0,
      width: horizontal ? horizontal : 0,
    }} />
  );
};

export default Spacer;
