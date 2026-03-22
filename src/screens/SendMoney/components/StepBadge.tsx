import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../../constants/colors';

type Props = {
  step: number;
  label: string;
  isActive: boolean;
};

const StepBadge = ({ step, label, isActive }: Props) => (
  <View className="items-center">
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: isActive ? Colors.primaryDark : '#e8eaff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: isActive ? '#fff' : Colors.primaryDark,
          fontWeight: '700',
          fontSize: 13,
        }}
      >
        {step}
      </Text>
    </View>
    <Text
      style={{
        fontSize: 10,
        marginTop: 4,
        color: isActive ? Colors.primaryDark : Colors.gray,
        fontWeight: isActive ? '600' : '400',
      }}
    >
      {label}
    </Text>
  </View>
);

export default StepBadge;
