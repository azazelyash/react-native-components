import React from 'react';
import { Text } from 'react-native';

const FormLabel = ({ text }: { text: string }) => (
  <Text style={{ fontSize: 13, color: '#4a5568', marginBottom: 6, fontWeight: '500' }}>
    {text}
  </Text>
);

export default FormLabel;
