import { Platform } from 'react-native';
import { Colors } from '../../constants/colors';

export const inputStyle = {
  borderWidth: 1,
  borderColor: '#e2e8f0',
  borderRadius: 10,
  paddingHorizontal: 14,
  paddingVertical: Platform.OS === 'ios' ? 14 : 10,
  fontSize: 15,
  color: Colors.black,
  backgroundColor: '#f7f8ff',
};
