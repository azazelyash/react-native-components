import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NoInternetScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-[#ffffff] items-center justify-center px-8"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Using absolute absolute overlay logic to not mess with the main application router */}
      <View className="w-24 h-24 bg-[#fee2e2] rounded-full items-center justify-center mb-6">
        <Ionicons name="wifi-outline" size={48} color="#ef4444" />
        <View className="absolute w-[3px] h-12 bg-[#ef4444]" style={{ transform: [{ rotate: '45deg' }] }} />
      </View>
      <Text className="text-2xl font-extrabold text-[#0f0f0f] mb-3 text-center">
        No Internet Connection
      </Text>
      <Text className="text-[15px] font-medium text-[#6b7280] text-center leading-6 mb-8">
        It looks like you're offline. Please check your data or Wi-Fi settings to continue using the app.
      </Text>
    </View>
  );
};

export default NoInternetScreen;
