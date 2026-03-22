import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { TOTAL_STEPS } from './constants';
import { SendMoneyForm, TransferType, SpeedTag } from './types';
import StepIndicatorBar from './components/StepIndicatorBar';
import StepHeader from './components/StepHeader';
import FooterButtons from './components/FooterButtons';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

const initialForm: SendMoneyForm = {
  // Step 1
  recipientName: '',
  accountNumber: '',
  bank: '',
  transferType: 'Bank Transfer' as TransferType,
  // Step 2
  amount: '',
  currency: 'USD',
  coverFees: false,
  speedTags: ['Instant'] as SpeedTag[],
  // Step 3
  note: '',
  scheduleDate: '',
  repeat: false,
};

const SendMoneyScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SendMoneyForm>(initialForm);
  const insets = useSafeAreaInsets();

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goPrev = () => {
    if (step === 1) {
      return navigation.goBack();
    }
    return setStep((s) => Math.max(s - 1, 1));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* ── Header ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: insets.top + 12,
          paddingBottom: 12,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
          backgroundColor: '#ffffff', // Allows changing header color independently
        }}
      >
        <TouchableOpacity onPress={goPrev}>
          <Text style={{ fontSize: 22, color: Colors.primaryDark }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.primaryDark }}>
          Send Money
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.primaryDark }}>
          {String(step).padStart(2, '0')}/{TOTAL_STEPS}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Step indicator bar ── */}
        <StepIndicatorBar currentStep={step} />

        {/* ── Step header ── */}
        <StepHeader step={step} totalSteps={TOTAL_STEPS} />

        {/* ── Step content ── */}
        {step === 1 && <Step1 form={form} setForm={setForm} />}
        {step === 2 && <Step2 form={form} setForm={setForm} />}
        {step === 3 && <Step3 form={form} setForm={setForm} />}
        {step === 4 && <Step4 form={form} />}

        <FooterButtons step={step} onBack={goPrev} onNext={goNext} />
        <View className="h-0" />
      </ScrollView>
    </View>
  );
};

export default SendMoneyScreen;
