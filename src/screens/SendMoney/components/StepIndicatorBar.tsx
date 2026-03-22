import React from 'react';
import { View } from 'react-native';
import StepBadge from './StepBadge';
import Divider from './Divider';
import { TOTAL_STEPS, STEP_LABELS } from '../constants';

type Props = {
  currentStep: number;
};

const StepIndicatorBar = ({ currentStep }: Props) => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24 }}>
    {STEP_LABELS.map((label, i) => {
      const s = i + 1;
      const isLast = s === TOTAL_STEPS;
      return (
        <React.Fragment key={s}>
          <StepBadge step={s} label={label} isActive={s === currentStep} />
          {!isLast && <Divider filled={s < currentStep} />}
        </React.Fragment>
      );
    })}
  </View>
);

export default StepIndicatorBar;
