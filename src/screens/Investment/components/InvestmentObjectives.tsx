import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { ObjectiveItem } from '../types';

const InvestmentObjectives = ({ objectives }: { objectives: ObjectiveItem[] }) => (
  <View className="mb-6">
    <Text className="text-[17px] font-bold text-[#111111] px-5 mb-4">
      Investment Objectives
    </Text>
    <View className="flex-row justify-around px-4">
      {objectives.map((obj) => (
        <TouchableOpacity key={obj.id} className="items-center gap-1.5" activeOpacity={0.75}>
          <View className="w-14 h-14 rounded-2xl bg-white items-center justify-center shadow-sm border border-[#ebebf0]">
            <Ionicons name={obj.icon as any} size={22} color={obj.color} />
          </View>
          <Text className="text-[12px] text-[#333333] font-semibold">
            {obj.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default InvestmentObjectives;
