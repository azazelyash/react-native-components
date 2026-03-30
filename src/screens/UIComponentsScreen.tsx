import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { AnimatedTextField } from '../components/ui/AnimatedTextField';
import { AnimatedCheckbox } from '../components/ui/AnimatedCheckbox';
import { AnimatedRadio } from '../components/ui/AnimatedRadio';
import { Ionicons } from '@react-native-vector-icons/ionicons';

const UIComponentsScreen = () => {
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const [password, setPassword] = useState('');
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promoAccepted, setPromoAccepted] = useState(true);
  
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'enterprise'>('pro');

  const handleSimulateError = () => {
    if (!email.includes('@')) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 40,
          paddingHorizontal: 28,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-10 mt-6">
        <Text className="text-[32px] font-bold text-zinc-900 tracking-tight">Design System</Text>
        <Text className="text-zinc-500 mt-2 text-[15px] font-medium">Sleek, minimal, modern components.</Text>
      </View>

      <View className="mb-10">
        <Text className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] mb-5">Text Inputs</Text>
        <AnimatedTextField
          label="Email Address"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (emailError) setEmailError('');
          }}
          error={emailError}
          autoCapitalize="none"
          keyboardType="email-address"
          leadingIcon={<Ionicons name="mail-outline" size={20} color="#a1a1aa" />}
        />
        <AnimatedTextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          isPassword
          leadingIcon={<Ionicons name="lock-closed-outline" size={20} color="#a1a1aa" />}
        />
        <View className="mt-2">
          <AnimatedButton label="Simulate Error" variant="secondary" onPress={handleSimulateError} />
        </View>
      </View>

      <View className="mb-10">
        <Text className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] mb-5">Selection</Text>
        <View className="gap-2 mb-6">
          <AnimatedCheckbox
            label="I accept the Terms and Conditions"
            checked={termsAccepted}
            onChange={setTermsAccepted}
          />
          <AnimatedCheckbox
            label="Subscribe to newsletter"
            checked={promoAccepted}
            onChange={setPromoAccepted}
          />
        </View>

        <View className="gap-2">
          <AnimatedRadio
            label="Basic Plan ($9/mo)"
            selected={selectedPlan === 'basic'}
            onChange={() => setSelectedPlan('basic')}
          />
          <AnimatedRadio
            label="Pro Plan ($29/mo)"
            selected={selectedPlan === 'pro'}
            onChange={() => setSelectedPlan('pro')}
          />
          <AnimatedRadio
            label="Enterprise Plan"
            selected={selectedPlan === 'enterprise'}
            onChange={() => setSelectedPlan('enterprise')}
          />
        </View>
      </View>

      <View className="mb-10">
        <Text className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] mb-5">Buttons</Text>
        <View className="gap-4">
          <AnimatedButton label="Primary Call to Action" onPress={() => {}} />
          <AnimatedButton label="Secondary Option" variant="secondary" onPress={() => {}} />
          <AnimatedButton label="Outlined Style" variant="outline" onPress={() => {}} />
          <AnimatedButton label="Destructive Action" variant="danger" onPress={() => {}} />
        </View>
      </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default UIComponentsScreen;
