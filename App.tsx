import './global.css';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavbarScreen from './src/screens/BottomNavbarScreen';
import NoInternetScreen from './src/screens/NoInternetScreen';
import NetInfo from '@react-native-community/netinfo';
import { BiometricWrapper } from './src/components/BiometricWrapper';

import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

          {/* Global Biometric App Lock layer */}
          <BiometricWrapper>
            {/* Main App Navigation */}
            <BottomNavbarScreen />

            {/* Transparent Global Overlay when user drops internet connection */}
            {isConnected === false && <NoInternetScreen />}
          </BiometricWrapper>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
