import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FUND_CARDS, OBJECTIVES, TRENDING_FUNDS } from './data';
import GreetingHeader from './components/GreetingHeader';
import RiskProfileBanner from './components/RiskProfileBanner';
import FundCardsScroll from './components/FundCardsScroll';
import InvestmentObjectives from './components/InvestmentObjectives';
import TrendingFunds from './components/TrendingFunds';
import InvestmentBottomBar from './components/InvestmentBottomBar';

const InvestmentScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#f5f5f0]" style={{ paddingTop: insets.top }}>
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        >
          {/* Greeting + avatar */}
          <GreetingHeader />

          {/* Risk profile pill */}
          <RiskProfileBanner />

          {/* Section intro */}
          <Text className="text-[14px] text-[#333333] px-5 mb-3.5 font-medium">
            Based on your profile, you may be interested in
          </Text>

          {/* Horizontal fund cards */}
          <FundCardsScroll cards={FUND_CARDS} />

          {/* Investment objectives */}
          <InvestmentObjectives objectives={OBJECTIVES} />

          {/* Trending funds */}
          <TrendingFunds funds={TRENDING_FUNDS} />
        </ScrollView>
      </View>

      {/* Bottom navigation bar */}
      <InvestmentBottomBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

export default InvestmentScreen;
