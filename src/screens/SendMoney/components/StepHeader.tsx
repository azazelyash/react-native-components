import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../../constants/colors';
import { STEP_TITLES, STEP_SUBTITLES } from '../constants';

type Props = {
  step: number;
  totalSteps: number;
};

const StepHeader = ({ step, totalSteps }: Props) => (
  <View style={{ marginBottom: 24 }}>
    <Text style={{ fontSize: 30, fontWeight: '800', color: Colors.primaryDark }}>
      {String(step).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
    </Text>
    <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.black, marginTop: 2 }}>
      {STEP_TITLES[step]}
    </Text>
    <View
      style={{
        width: 40,
        height: 3,
        borderRadius: 2,
        backgroundColor: Colors.primaryDark,
        marginTop: 8,
      }}
    />
    <Text style={{ fontSize: 13, color: Colors.darkGray2, marginTop: 6 }}>
      {STEP_SUBTITLES[step]}
    </Text>
  </View>
);

export default StepHeader;
