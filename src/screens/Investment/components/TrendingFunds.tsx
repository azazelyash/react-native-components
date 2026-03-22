import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { TrendingFund } from '../types';

function TrendCard({ fund }: { fund: TrendingFund }) {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-[16px] p-3.5 mx-5 mb-2.5 border border-[#ebebf0] shadow-sm"
      activeOpacity={0.82}
    >
      <View
        className="w-[52px] h-[52px] rounded-xl items-center justify-center"
        style={{ backgroundColor: fund.thumbBg }}
      >
        <Ionicons name={fund.icon as any} size={26} color={fund.iconColor} />
      </View>

      <View className="flex-1 ml-3.5">
        <Text className="text-[15px] font-bold text-[#111] mb-1.5">
          {fund.title}
        </Text>
        <View className="flex-row items-center gap-2 flex-wrap">
          <View
            className="rounded-lg px-2 py-[3px]"
            style={{ backgroundColor: fund.badgeColor }}
          >
            <Text className="text-[11px] font-bold" style={{ color: fund.badgeText }}>
              {fund.badge}
            </Text>
          </View>
          <Text className="text-[12px] text-[#888] flex-1" numberOfLines={1}>
            {fund.meta}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#ccc" />
    </TouchableOpacity>
  );
}

const TrendingFunds = ({ funds }: { funds: TrendingFund[] }) => (
  <View className="mb-3">
    <View className="flex-row items-center justify-between px-5 mb-3">
      <Text className="text-[17px] font-bold text-[#111] flex-1 mr-2">
        Trending With Investors Like You
      </Text>
      <TouchableOpacity>
        <Text className="text-[13px] text-[#c8a84b] font-bold">View All</Text>
      </TouchableOpacity>
    </View>
    {funds.map((fund) => (
      <TrendCard key={fund.id} fund={fund} />
    ))}
  </View>
);

export default TrendingFunds;
