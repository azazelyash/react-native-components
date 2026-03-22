import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../../../constants/colors';

const SectionTitle = ({ text }: { text: string }) => (
  <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black, marginBottom: 12 }}>
    {text}
  </Text>
);

export default SectionTitle;
