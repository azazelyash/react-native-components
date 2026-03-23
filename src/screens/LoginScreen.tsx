import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Load from local storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const values = await AsyncStorage.multiGet(['nav_login_email', 'nav_login_password']);
        const storedEmail = values[0][1];
        const storedPassword = values[1][1];
        if (storedEmail) setEmail(storedEmail);
        if (storedPassword) setPassword(storedPassword);
      } catch (e) {
        console.error('Failed to load login data from storage.', e);
      }
    };
    loadData();
  }, []);

  const handleLoginSubmit = async () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    if (isValid) {
      try {
        await AsyncStorage.multiSet([
          ['nav_login_email', email],
          ['nav_login_password', password]
        ]);
        Alert.alert('Success', 'Login information saved successfully!');
      } catch (e) {
        console.error('Failed to save login info.', e);
        Alert.alert('Error', 'Failed to save login information.');
      }
    }
  };

  const handleClearData = async () => {
    try {
      await AsyncStorage.multiRemove(['nav_login_email', 'nav_login_password']);
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      Alert.alert('Cleared', 'Login information has been cleared from storage.');
    } catch (e) {
      console.error('Failed to clear login info.', e);
    }
  };

  return (
    <View 
      className="flex-1 bg-[#f8f9ff]" 
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="flex-row items-center px-5 py-4">
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          className="p-2 -ml-2 mr-2 bg-[#ffffff] rounded-xl shadow-sm elevation-2"
        >
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#000000]">Back to Hub</Text>
      </View>

      <ScrollView contentContainerClassName="p-6">
        {/* Login Form */}
        <View className="bg-[#ffffff] p-6 rounded-3xl border border-[#ebebf0] shadow-sm elevation-3">
          <Text className="text-2xl font-extrabold text-[#0f0f0f] mb-2">Welcome Back</Text>
          <Text className="text-sm text-[#6b7280] mb-6">Sign in to continue accessing your account.</Text>
          
          <TextInput
            className={`border p-4 rounded-xl bg-[#fcfcfd] text-[#0f0f0f] text-base ${emailError ? 'border-[#ef4444] mb-1.5' : 'border-[#ebebf0] mb-4'}`}
            placeholder="Email Address"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={(text) => { setEmail(text); if(emailError) setEmailError(''); }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {!!emailError && <Text className="text-[#ef4444] text-sm mb-4 px-1">{emailError}</Text>}

          <TextInput
            className={`border p-4 rounded-xl bg-[#fcfcfd] text-[#0f0f0f] text-base ${passwordError ? 'border-[#ef4444] mb-1.5' : 'border-[#ebebf0] mb-8'}`}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={(text) => { setPassword(text); if(passwordError) setPasswordError(''); }}
            secureTextEntry
          />
          {!!passwordError && <Text className="text-[#ef4444] text-sm mb-8 px-1">{passwordError}</Text>}

          <View className="flex-col gap-3">
            <TouchableOpacity 
              onPress={handleLoginSubmit} 
              className="bg-[#6366f1] py-4 rounded-xl items-center shadow-md shadow-[#6366f1]/30 elevation-4"
            >
              <Text className="text-[#ffffff] font-bold text-base">Submit & Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleClearData} 
              className="bg-[#fee2e2] py-4 rounded-xl items-center"
            >
              <Text className="text-[#ef4444] font-bold text-base">Clear Saved Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
