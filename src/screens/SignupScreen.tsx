import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { updateFormData, nextStep, prevStep, completeSignup, resetSignup } from '../store/slices/signupSlice';
import { RootState } from '../store';

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  
  // Select state from Redux
  const signupState = useSelector((state: RootState) => state.signup);
  const { step, firstName, lastName, email, phone, pin, isComplete } = signupState;

  const handleNext = () => {
    if (step < 3) {
      dispatch(nextStep());
    } else {
      dispatch(completeSignup());
      // Go to some success page or back to hub, for now just reset and go home
      navigation.navigate('Tabs', { screen: 'Hub' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      dispatch(prevStep());
    } else {
      navigation.goBack();
    }
  };

  const handleReset = () => {
    dispatch(resetSignup());
  };

  // Render varying input steps
  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <Text className="text-2xl font-extrabold text-[#112233] mb-2">Personal Details</Text>
            <Text className="text-gray-500 mb-8">Step 1 of 3. Let's start with your name.</Text>
            
            <TextInput
              className="w-full bg-[#f8f9ff] border border-gray-200 rounded-xl p-4 text-[#112233] mb-4 text-base"
              placeholder="First Name"
              placeholderTextColor="#9ca3af"
              value={firstName}
              onChangeText={(text) => dispatch(updateFormData({ firstName: text }))}
            />
            
            <TextInput
              className="w-full bg-[#f8f9ff] border border-gray-200 rounded-xl p-4 text-[#112233] mb-4 text-base"
              placeholder="Last Name"
              placeholderTextColor="#9ca3af"
              value={lastName}
              onChangeText={(text) => dispatch(updateFormData({ lastName: text }))}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text className="text-2xl font-extrabold text-[#112233] mb-2">Contact Info</Text>
            <Text className="text-gray-500 mb-8">Step 2 of 3. How can we reach you?</Text>
            
            <TextInput
              className="w-full bg-[#f8f9ff] border border-gray-200 rounded-xl p-4 text-[#112233] mb-4 text-base"
              placeholder="Email Address"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => dispatch(updateFormData({ email: text }))}
            />
            
            <TextInput
              className="w-full bg-[#f8f9ff] border border-gray-200 rounded-xl p-4 text-[#112233] mb-4 text-base"
              placeholder="Phone Number"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => dispatch(updateFormData({ phone: text }))}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-2xl font-extrabold text-[#112233] mb-2">Security</Text>
            <Text className="text-gray-500 mb-8">Step 3 of 3. Create a secure 4-digit PIN.</Text>
            
            <TextInput
              className="w-full bg-[#f8f9ff] border border-gray-200 rounded-xl p-4 text-[#112233] mb-4 text-base text-center tracking-[1rem] font-bold text-xl"
              placeholder="••••"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
              value={pin}
              onChangeText={(text) => dispatch(updateFormData({ pin: text }))}
            />

            {/* Faux Summary of what is entered so far */}
            <View className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
               <Text className="text-indigo-800 font-bold mb-2">Data ready to save:</Text>
               <Text className="text-indigo-600 text-xs">Name: {firstName} {lastName}</Text>
               <Text className="text-indigo-600 text-xs">Email: {email}</Text>
               <Text className="text-indigo-600 text-xs">Phone: {phone}</Text>
            </View>
          </>
        );
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-white" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ paddingTop: insets.top }} className="flex-1">
        
        {/* Header */}
        <View className="flex-row items-center px-6 py-4 justify-between border-b border-gray-100">
          <TouchableOpacity onPress={handlePrev} className="w-10 h-10 items-center justify-center -ml-2 bg-gray-50 rounded-full">
            <Ionicons name="chevron-back" size={24} color="#112233" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-[#112233]">Create Account</Text>
          <TouchableOpacity onPress={handleReset} className="w-10 h-10 items-center justify-center -mr-2">
            <Text className="text-red-500 text-xs font-bold">Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View className="h-1 bg-gray-100 w-full flex-row">
          <View className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 24 }} keyboardShouldPersistTaps="handled">
          
          {renderStepContent()}

          {/* Action Button */}
          <TouchableOpacity 
            onPress={handleNext}
            className="w-full bg-indigo-600 py-4 rounded-xl items-center mt-12 shadow-md shadow-indigo-500/30"
          >
            <Text className="text-white font-bold text-[16px]">
              {step === 3 ? 'Complete Signup' : 'Continue'}
            </Text>
          </TouchableOpacity>
          
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
