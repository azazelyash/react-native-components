import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

const RiskProfileBanner = () => (
  <View className="flex-row items-center mx-5 mb-[18px] bg-[#eeeee8] rounded-3xl px-4 py-2.5">
    <View className="flex-row items-center">
      <Text className="text-[12px] text-[#888888]">Risk Profile: </Text>
      <Text className="text-[12px] font-bold text-[#333333]">Balanced</Text>
    </View>
    <View className="w-[1px] h-[14px] bg-[#cccccc] mx-3" />
    <View className="flex-row items-center">
      <Text className="text-[12px] text-[#888888]">Horizon: </Text>
      <Text className="text-[12px] font-bold text-[#333333]">5+ Years</Text>
    </View>
    <TouchableOpacity className="ml-auto p-1">
      <Ionicons name="pencil-outline" size={15} color="#888" />
    </TouchableOpacity>
  </View>
);

export default RiskProfileBanner;
