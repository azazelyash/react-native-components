import './global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomNavbarScreen from './src/screens/BottomNavbarScreen';

import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';

enableScreens();

function App() {
  return (
    <SafeAreaProvider>
      <BottomNavbarScreen />
    </SafeAreaProvider>
  );
}

export default App;
