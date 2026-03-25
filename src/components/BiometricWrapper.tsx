import React, { useState, useEffect, useRef } from 'react';
import { AppState, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const rnBiometrics = new ReactNativeBiometrics();

interface Props {
  children: React.ReactNode;
}

export const BiometricWrapper: React.FC<Props> = ({ children }) => {
  const isUserLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);

  const appState = useRef(AppState.currentState);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const hasCheckedInitialLogin = useRef(false);

  useEffect(() => {
    // 1. If user is completely logged out, we bypass the lock screen entirely.
    if (!isUserLoggedIn) {
      setIsUnlocked(true);
      setIsInitializing(false);
      hasCheckedInitialLogin.current = false;
      return;
    }

    // 2. If user is logged in, and this is the first time observing this login state:
    if (!hasCheckedInitialLogin.current) {
      hasCheckedInitialLogin.current = true;
      // If we are currently locked (isUnlocked === false), it means the app launched with
      // the user already logged in. Otherwise, if isUnlocked === true, they just manually logged
      // in during this active session and we don't need to pester them with biometrics immediately.
      if (!isUnlocked) {
        checkBiometryAndAuthenticate();
      } else {
        setIsInitializing(false);
      }
    }

    // 3. Register global AppState listener for background/foreground transitions.
    const subscription = AppState.addEventListener('change', nextAppState => {
      // App moving to background
      if (
        appState.current.match(/active/) &&
        (nextAppState === 'inactive' || nextAppState === 'background')
      ) {
        setIsUnlocked(false);
      }
      
      // App returning to foreground
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkBiometryAndAuthenticate();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]); // Only set up listeners when login state changes

  const checkBiometryAndAuthenticate = async () => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      if (!available) {
        // Fallback to auto-auth if device doesn't support biometrics physically
        setIsUnlocked(true);
        setIsInitializing(false);
        return;
      }

      await authenticate();
    } catch (error) {
      console.log('Biometrics Check Error:', error);
      setIsUnlocked(true); 
      setIsInitializing(false);
    }
  };

  const authenticate = async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint or FaceID' });
      if (success) {
        setIsUnlocked(true);
      }
    } catch (error) {
      console.log('Biometrics Prompt Error:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  // If the user isn't logged in, they can freely access the navigation to log in.
  if (!isUserLoggedIn) {
    return <>{children}</>;
  }

  // Once logged in, if we haven't verified sensors yet:
  if (isInitializing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If user is logged in, but their biometric lock triggered (e.g., from backgrounding app)
  if (!isUnlocked) {
    return (
      <Animated.View entering={FadeIn.duration(400)} className="flex-1 justify-center items-center bg-gray-100 p-6">
        <View className="bg-white p-8 rounded-2xl shadow-lg items-center w-full max-w-sm">
          <View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-6">
            <Text className="text-blue-500 text-3xl font-bold">🔒</Text>
          </View>
          <Text className="text-2xl font-bold mb-2 text-gray-800 text-center">App Locked</Text>
          <Text className="text-gray-500 text-center mb-8">
            Please authenticate to access your secure data.
          </Text>
          
          <TouchableOpacity 
            className="w-full py-4 bg-primary rounded-xl items-center"
            onPress={authenticate}
          >
            <Text className="text-white text-lg font-semibold">Unlock with Biometrics</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  // Once authenticated
  return <>{children}</>;
};
