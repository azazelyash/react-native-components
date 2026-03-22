import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { FundCard } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = SCREEN_WIDTH * 0.72;

function FundCardItem({ item }: { item: FundCard }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={{ width: CARD_WIDTH, backgroundColor: item.bgColor }}
      className="rounded-[18px] p-[18px] mr-3 border-[1.5px] border-white/10"
    >
      {/* Top row */}
      <View className="flex-row items-center justify-between mb-3.5">
        <View className="bg-white/20 rounded-xl px-2.5 py-1">
          <Text className="text-white text-[11px] font-semibold">{item.tag}</Text>
        </View>
        <View className="flex-row gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </View>
      </View>

      {/* Title */}
      <Text className="text-white text-[18px] font-extrabold mb-3 leading-6">
        {item.title}
      </Text>

      {/* Yield */}
      <View className="flex-row items-baseline mb-3.5">
        <Text className="text-[#c8e88a] text-[22px] font-extrabold">
          {item.yield}
        </Text>
        <Text className="text-white/60 text-[13px] font-medium ml-2">
          {item.yieldLabel}
        </Text>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-white/20 mb-3.5" />

      {/* Footer */}
      <View className="flex-row justify-between">
        <Text className="text-white/75 text-[12px] font-semibold">Min: {item.min}</Text>
        <Text className="text-white/75 text-[12px] font-semibold">{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const FundCardsScroll = ({ cards }: { cards: FundCard[] }) => (
  <FlatList
    data={cards}
    horizontal
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingLeft: 20, paddingRight: 8, paddingBottom: 28 }}
    snapToAlignment="start"
    decelerationRate="fast"
    snapToInterval={CARD_WIDTH + 12}
    renderItem={({ item }) => <FundCardItem item={item} />}
  />
);

export default FundCardsScroll;
