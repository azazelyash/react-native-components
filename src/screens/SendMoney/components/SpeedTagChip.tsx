import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../../constants/colors';
import { SpeedTag } from '../types';

type Props = {
  label: SpeedTag;
  selected: boolean;
  onPress: () => void;
};

const SpeedTagChip = ({ label, selected, onPress }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: selected ? Colors.primaryDark : '#cbd5e0',
      backgroundColor: selected ? Colors.primaryDark : '#fff',
      marginRight: 8,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    {selected && (
      <Text style={{ color: '#fff', marginRight: 4, fontSize: 12 }}>✕</Text>
    )}
    <Text
      style={{
        fontSize: 13,
        color: selected ? '#fff' : '#4a5568',
        fontWeight: selected ? '600' : '400',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default SpeedTagChip;
