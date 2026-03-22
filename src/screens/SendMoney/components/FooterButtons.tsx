import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '../../../constants/colors';
import { TOTAL_STEPS } from '../constants';

type Props = {
  step: number;
  onBack: () => void;
  onNext: () => void;
};

const FooterButtons = ({ step, onBack, onNext }: Props) => (
  <View
    style={{
      flexDirection: 'row',
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 28 : 16,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
      gap: 12,
    }}
  >
    {/* Save Draft / Back */}
    <TouchableOpacity
      onPress={onBack}
      style={{
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: Colors.primaryDark,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <Text style={{ fontSize: 11, color: Colors.primaryDark, fontWeight: '600' }}>💾</Text>
      <Text style={{ fontSize: 13, color: Colors.primaryDark, fontWeight: '700' }}>
        {step === 1 ? 'CANCEL' : 'BACK'}
      </Text>
    </TouchableOpacity>

    {/* Next / Submit */}
    <TouchableOpacity
      onPress={onNext}
      style={{
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: Colors.primaryDark,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <Text style={{ fontSize: 14, color: '#fff', fontWeight: '700' }}>
        {step === TOTAL_STEPS ? 'SEND MONEY' : 'NEXT'}
      </Text>
      <Text style={{ fontSize: 13, color: '#fff' }}>
        {step === TOTAL_STEPS ? '🚀' : '▶'}
      </Text>
    </TouchableOpacity>
  </View>
);

export default FooterButtons;
