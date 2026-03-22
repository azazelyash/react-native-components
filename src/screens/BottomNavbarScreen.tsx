import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import HomeScreen from './HomeScreen';
import SelectCardsScreen from './SelectCardsScreen';
import SendMoneyScreen from './SendMoneyScreen';
import NavigationHubScreen from './NavigationHubScreen';
import InvestmentScreen from './Investment/InvestmentScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ICONS: Record<string, [string, string]> = {
  Home: ['home', 'home-outline'],
  SelectCards: ['card', 'card-outline'],
  SendMoneyTab: ['cash-outline', 'cash-outline'],
  Hub: ['grid', 'grid-outline'],
};

// ── Animated pill button with ripple splash ───────────────────────────────────

function PillButton({
  label,
  focused,
  onPress,
  onLongPress,
}: {
  label: string;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;

  const squeeze = () => {
    // Icon squish
    Animated.spring(scale, {
      toValue: 0.65,
      useNativeDriver: true,
      speed: 50,
      bounciness: 2,
    }).start();

    // Ripple burst — expand a white circle from center, fade out
    rippleScale.setValue(0);
    rippleOpacity.setValue(0.35);
    Animated.parallel([
      Animated.timing(rippleScale, {
        toValue: 1.8,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const release = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 18,
      bounciness: 16,
    }).start();

  const [filled, outline] = ICONS[label] ?? ['ellipse', 'ellipse-outline'];

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={squeeze}
      onPressOut={release}
    >
      {/* Outer wrapper — keeps flex sizing, clips ripple */}
      <View className="flex-1 h-full items-center justify-center overflow-hidden rounded-full">
        {/* Ripple circle */}
        <Animated.View
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#ffffff',
            opacity: rippleOpacity,
            transform: [{ scale: rippleScale }],
          }}
        />
        {/* Icon with squish */}
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons
            name={(focused ? filled : outline) as any}
            size={22}
            color={focused ? '#ffffff' : '#666666'}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// ── Custom tab bar ────────────────────────────────────────────────────────────

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute bottom-10 left-0 right-0 items-center" pointerEvents="box-none">
      <View className="flex-row items-center justify-evenly bg-[#0a0a0a] rounded-full h-16 w-64 p-2 shadow-lg">
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () =>
            navigation.emit({ type: 'tabLongPress', target: route.key });

          return (
            <PillButton
              key={route.key}
              label={route.name}
              focused={focused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

// ── Tab navigator ─────────────────────────────────────────────────────────────

function TabNavigator({ navigation }: { navigation: any }) {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SelectCards" component={SelectCardsScreen} />
      <Tab.Screen
        name="SendMoneyTab"
        component={HomeScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('SendMoney');
          },
        }}
      />
      <Tab.Screen name="Hub" component={NavigationHubScreen} />
    </Tab.Navigator>
  );
}

// ── Root stack ────────────────────────────────────────────────────────────────

const BottomNavbarScreen = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
      <Stack.Screen name="Investment" component={InvestmentScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default BottomNavbarScreen;
