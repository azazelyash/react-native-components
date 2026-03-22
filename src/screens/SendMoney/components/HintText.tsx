import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../../../constants/colors';

const HintText = ({ text }: { text: string }) => (
  <Text style={{ fontSize: 12, color: Colors.darkGray2, marginTop: 4 }}>{text}</Text>
);

export default HintText;
