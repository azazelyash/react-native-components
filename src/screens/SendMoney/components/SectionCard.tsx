import React from 'react';
import { View } from 'react-native';

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      backgroundColor: '#f7f8ff',
      borderRadius: 14,
      padding: 16,
      marginTop: 12,
      borderWidth: 1,
      borderColor: '#e8eaff',
    }}
  >
    {children}
  </View>
);

export default SectionCard;
