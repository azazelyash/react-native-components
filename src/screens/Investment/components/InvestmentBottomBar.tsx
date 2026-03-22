import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TABS = [
  { id: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { id: 'discover', label: 'Discover', icon: 'compass-outline', activeIcon: 'compass' },
  { id: 'compare', label: 'Compare', icon: 'git-compare-outline', activeIcon: 'git-compare' },
  { id: 'insights', label: 'Insights', icon: 'bar-chart-outline', activeIcon: 'bar-chart' },
  { id: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

const TAB_COUNT = TABS.length;
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT;
const DOT_WIDTH = 26; // resting indicator width
const DOT_HEIGHT = 3;
const DOT_CENTER_X = (TAB_WIDTH - DOT_WIDTH) / 2; // offset to centre inside a tab

type Props = {
  activeTab: string;
  onTabPress: (id: string) => void;
};

// ── Sliding indicator ────────────────────────────────────────────────────────

function useSlidingIndicator(activeIndex: number) {
  const indicatorLeft = useRef(new Animated.Value(activeIndex * TAB_WIDTH + DOT_CENTER_X)).current;

  useEffect(() => {
    Animated.spring(indicatorLeft, {
      toValue: activeIndex * TAB_WIDTH + DOT_CENTER_X,
      useNativeDriver: false,
      speed: 40,
      bounciness: 4,
    }).start();
  }, [activeIndex]);

  return { indicatorLeft };
}

// ── Individual tab button ─────────────────────────────────────────────────────

function TabButton({
  tab,
  active,
  onPress,
}: {
  tab: typeof TABS[number];
  active: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.82, useNativeDriver: true, speed: 50, bounciness: 2 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 14 }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity className="flex-1 items-center pt-1" onPress={handlePress} activeOpacity={1}>
      <Animated.View className="items-center gap-[3px]" style={{ transform: [{ scale }] }}>
        <Ionicons
          name={(active ? tab.activeIcon : tab.icon) as any}
          size={22}
          color={active ? '#0d6e5c' : '#aaa'}
        />
        <Text className={`text-[10px] ${active ? 'text-[#0d6e5c] font-bold' : 'text-[#aaa] font-medium'}`}>
          {tab.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const InvestmentBottomBar = ({ activeTab, onTabPress }: Props) => {
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);
  const { indicatorLeft } = useSlidingIndicator(activeIndex);
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row bg-white border-t border-[#efefef] pt-2.5 shadow-lg z-50"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      {/* ── Sliding indicator ── */}
      <Animated.View
        className="absolute top-0 bg-[#0d6e5c]"
        style={[
          { height: DOT_HEIGHT, borderRadius: DOT_HEIGHT / 2 },
          { left: indicatorLeft, width: DOT_WIDTH },
        ]}
      />

      {/* ── Tabs ── */}
      {TABS.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          active={activeTab === tab.id}
          onPress={() => onTabPress(tab.id)}
        />
      ))}
    </View>
  );
};

export default InvestmentBottomBar;
