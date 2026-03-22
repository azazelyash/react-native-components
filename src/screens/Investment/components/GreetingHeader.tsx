import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

const GreetingHeader = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-row items-center px-5 pt-3.5 pb-3">
      {/* Back button */}
      <TouchableOpacity
        className="w-[38px] h-[38px] rounded-xl bg-white items-center justify-center border border-[#e8e8e8] mr-3"
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={20} color="#333" />
      </TouchableOpacity>

      {/* Avatar + text */}
      <View className="flex-1 flex-row items-center justify-between">
        <View>
          <Text className="text-[13px] text-[#888888]">Good afternoon,</Text>
          <Text className="text-[24px] font-extrabold text-[#111111] tracking-tight">
            Tarek !
          </Text>
        </View>
        <View className="w-[44px] h-[44px] rounded-full bg-[#e0e0e0] items-center justify-center">
          <Ionicons name="person" size={22} color="#888" />
        </View>
      </View>
    </View>
  );
};

export default GreetingHeader;
