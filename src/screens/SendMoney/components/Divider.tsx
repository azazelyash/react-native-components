import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../../constants/colors';

const Divider = ({ filled }: { filled: boolean }) => (
  <View
    style={{
      flex: 1,
      height: 2,
      backgroundColor: filled ? Colors.primaryDark : '#dde1ff',
      borderRadius: 2,
    }}
  />
);

export default Divider;
