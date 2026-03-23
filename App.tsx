import './global.css';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavbarScreen from './src/screens/BottomNavbarScreen';
import NoInternetScreen from './src/screens/NoInternetScreen';
import NetInfo from '@react-native-community/netinfo';

import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';

enableScreens();

function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    // Monitor global network status
    const unsubscribe = NetInfo.addEventListener(state => {
      // Default to true if null to prevent random flash on open
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Main App Navigation */}
      <BottomNavbarScreen />
      
      {/* Transparent Global Overlay when user drops internet connection */}
      {isConnected === false && <NoInternetScreen />}
    </SafeAreaProvider>
  );
}

export default App;
