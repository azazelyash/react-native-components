import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

const RedHalo = () => (
  <View className="absolute z-0 pointer-events-none" style={{ width: 100, height: 100, top: -22, left: -22 }}>
    <Svg height="100%" width="100%">
      <Defs>
        <RadialGradient id="gradRed" cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0%" stopColor="#ff3d30" stopOpacity="0.6" />
          <Stop offset="50%" stopColor="#ff3d30" stopOpacity="0.2" />
          <Stop offset="100%" stopColor="#ff3d30" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradRed)" />
    </Svg>
  </View>
);

const WhiteCenterHalo = () => (
  <View className="absolute z-0 pointer-events-none" style={{ width: 140, height: 140, top: -38, left: -38 }}>
    <Svg height="100%" width="100%">
      <Defs>
        <RadialGradient id="gradWhite" cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <Stop offset="60%" stopColor="#ffffff" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradWhite)" />
    </Svg>
  </View>
);

export default function FinanceOverviewScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Create the exact upper curved tab "hill"
  // Starts flat at y=40, arcs up to Peak at x=100, y=0
  const topNotchPath = `
    M0,60 
    L0,40
    L35,40
    C50,40 60,0 100,0
    C140,0 150,40 165,40
    L${width},40
    L${width},60
    Z
  `;

  // Create the exact bottom tab bar "scoop"
  // Dips down smoothly in the middle
  const cx = width / 2;
  const bottomNavPath = `
    M0,100 
    L0,20 
    L${cx - 45},20 
    C${cx - 25},20 ${cx - 30},65 ${cx},65 
    C${cx + 30},65 ${cx + 25},20 ${cx + 45},20 
    L${width},20 
    L${width},100 
    Z
  `;

  return (
    <View className="flex-1 bg-[#ff3d30] relative">
      
      {/* SVG Notch drawing the white background "Hill" */}
      <View className="absolute w-full z-10 pointer-events-none" style={{ top: insets.top + 50, height: 60 }}>
        <Svg height="60" width={width} viewBox={`0 0 ${width} 60`}>
          <Path d={topNotchPath} fill="#f8f9ff" />
        </Svg>
        {/* The little red dot inside the hill peak */}
        <View className="absolute bg-[#ff3d30] rounded-full w-1.5 h-1.5" style={{ top: 12, left: 96.5 }} />
      </View>

      {/* Full white background spanning downwards from the notch */}
      <View className="absolute w-full bottom-0 bg-[#f8f9ff] -z-10" style={{ top: insets.top + 90 }} />

      {/* Main Content Scroll */}
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }} 
        showsVerticalScrollIndicator={false}
        className="z-20"
      >
        <View style={{ paddingTop: insets.top + 20 }} />

        {/* Top Header & Tabs Text */}
        <View className="px-8 flex-row items-center justify-between mb-8">
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            className="w-10 h-10 items-center justify-center absolute left-2 z-50 bg-black/10 rounded-full"
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View className="flex-1 flex-row items-center justify-end gap-[22px] ml-[44px]">
            {/* Overview is mapped directly over the SVG notch */}
            <Text className="text-white font-extrabold text-[15px] mb-2">Overview</Text>
            <Text className="text-white/70 font-bold text-[15px] mb-2">Transactions</Text>
            <Text className="text-white/70 font-bold text-[15px] mb-2">Budget</Text>
          </View>
        </View>

        {/* Space reserved for where the SVG notch peaks */}
        <View className="h-[20px]" />

        {/* Cards Row */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="pl-8 mb-8 mt-2"
          snapToInterval={280 + 16}
          decelerationRate="fast"
        >
          {/* Card 1: Request */}
          <View className="w-[280px] bg-white rounded-[24px] p-6 mr-4 shadow-sm elevation-[8] shadow-black/5">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-[#0f0f0f] font-bold text-[17px] mb-1">Agnes Cela</Text>
                <Text className="text-gray-400 text-[13px] font-medium">requests money</Text>
              </View>
              {/* Profile Pic Placeholder */}
              <View className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-indigo-50 items-center justify-center">
                <Ionicons name="person" size={24} color="#c7d2fe" />
              </View>
            </View>
            <Text className="text-[20px] font-extrabold text-[#0f0f0f]">1,500.00 ALL</Text>
          </View>

          {/* Card 2: Fine */}
          <View className="w-[280px] bg-white rounded-[24px] p-6 mr-8 shadow-sm elevation-[8] shadow-black/5">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-[#0f0f0f] font-bold text-[17px] mb-1">New traffic fi...</Text>
                <Text className="text-gray-400 text-[13px] font-medium">to pay for</Text>
              </View>
            </View>
            <Text className="text-[20px] font-extrabold text-[#0f0f0f]">4,952.73 ALL</Text>
          </View>
        </ScrollView>

        {/* Balance Section */}
        <View className="px-8 flex-row items-end justify-between mb-8">
          <View>
            <Text className="text-gray-500 font-medium mb-1">My balance</Text>
            <Text className="text-3xl font-extrabold text-[#112233]">
              175,160<Text className="text-[20px]">.03</Text> <Text className="text-[17px] font-extrabold text-[#112233]">ALL</Text>
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-gray-500 font-medium mb-1 text-right">Available balance</Text>
            <Text className="text-[20px] font-extrabold text-[#112233] opacity-80">
              375,160<Text className="text-[15px]">.03</Text> <Text className="text-[13px] font-bold text-[#112233]">ALL</Text>
            </Text>
          </View>
        </View>

        {/* Accounts List */}
        <Text className="px-8 text-[26px] font-extrabold text-[#112233] mb-6">Accounts</Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="pl-8 pb-6"
          snapToInterval={170 + 16}
          decelerationRate="fast"
        >
          {/* Salary Account */}
          <View className="w-[170px] bg-white p-5 rounded-[28px] mr-4 shadow-sm elevation-[8] shadow-black/5 h-[250px]">
            <View className="relative z-10 w-14 h-14 mb-5">
              <RedHalo /> {/* Exact intense red glowing shadow */}
              <View className="absolute top-0 left-0 w-14 h-14 bg-[#ff3d30] rounded-[20px] items-center justify-center z-10">
                <Ionicons name="wallet-outline" size={24} color="white" />
              </View>
            </View>
            <Text className="text-[#0f0f0f] font-bold text-[15px] leading-5 mb-1.5 w-4/5">Salary account</Text>
            <Text className="text-[#0f0f0f] font-black text-[13px] mb-3">100,400.25 ALL</Text>
            
            {/* Tiny mocked credit card image block */}
            <View className="w-10 h-6 bg-gradient-to-r from-slate-700 to-slate-900 rounded-[4px] mb-5 border border-slate-600 opacity-90 items-center justify-center flex-row">
              <View className="w-2 h-2 bg-yellow-400 rounded-full opacity-60 ml-3" />
            </View>

            <View className="mt-auto">
              <Text className="text-gray-400 text-[10px] font-medium">Available overdraft</Text>
              <Text className="text-gray-300 text-[10px] font-medium mt-0.5">200,000.00 ALL</Text>
            </View>
          </View>

          {/* Travel Account */}
          <View className="w-[170px] bg-white p-5 rounded-[28px] mr-8 shadow-sm elevation-[8] shadow-black/5 h-[250px]">
             <View className="relative z-10 w-14 h-14 mb-5">
              <RedHalo />
              <View className="absolute top-0 left-0 w-14 h-14 bg-[#ff3d30] rounded-[20px] items-center justify-center z-10">
                <Ionicons name="briefcase-outline" size={24} color="white" />
              </View>
            </View>
            <Text className="text-[#0f0f0f] font-bold text-[15px] leading-5 mb-1.5 w-4/5">Travel EUR account</Text>
            <Text className="text-[#0f0f0f] font-black text-[13px] mb-4">403.82 EUR</Text>
            
            <View className="mt-auto">
              <Text className="text-gray-400 text-[10px] font-medium">50,000.00 ALL</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      {/* SVG Custom Curved Bottom Navbar */}
      <View className="absolute bottom-0 left-0 right-0 h-[100px] z-50 pointer-events-box-none">
        
        {/* Draw the white navbar with the inverted center scoop */}
        <View className="absolute bottom-0 left-0 right-0 shadow-lg elevation-24 shadow-black/10">
          <Svg height="100" width={width} viewBox={`0 0 ${width} 100`}>
            <Path d={bottomNavPath} fill="#ffffff" />
          </Svg>
        </View>

        {/* Container for the Tab Content */}
        <View className="absolute bottom-0 w-full h-[80px] flex-row items-center justify-between pb-6 px-1 z-50">

          <TouchableOpacity className="flex-[1] items-center justify-center">
            <Ionicons name="briefcase-outline" size={24} color="#ff3d30" />
            <Text className="text-[#ff3d30] text-[9.5px] font-black uppercase mt-1">My finance</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-[1.2] items-center justify-center px-1">
            <View style={{ height: 26 }} />
            <Text className="text-gray-400 text-[10px] font-extrabold uppercase line-clamp-1 pb-1">Payments & Transfers</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-[1] items-center justify-center">
            <View className="w-6 h-6 border-[2px] border-gray-400 rounded-full items-center justify-center mb-1">
              <Ionicons name="star" size={12} color="#9ca3af" />
            </View>
            <Text className="text-gray-400 text-[10px] font-extrabold uppercase">Products</Text>
          </TouchableOpacity>
        </View>
        
        {/* The Floating Center Swap Button over the Scoop */}
        {/* With the strong soft white/gray matching glowing halo */}
        <View className="absolute bottom-[35px] left-1/2 -ml-8 w-16 h-16 z-50 items-center justify-center">
          <WhiteCenterHalo />
          <TouchableOpacity className="absolute w-[60px] h-[60px] bg-[#f8f9ff] rounded-full items-center justify-center z-10 shadow-sm border border-gray-100/50">
            <Ionicons name="swap-horizontal" size={28} color="#112233" style={{ transform: [{ rotate: '-45deg' }] }} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
