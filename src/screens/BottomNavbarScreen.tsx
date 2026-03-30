import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { BlurView } from '@react-native-community/blur';

import HomeScreen from './HomeScreen';
import SelectCardsScreen from './SelectCardsScreen';
import SendMoneyScreen from './SendMoneyScreen';
import NavigationHubScreen from './NavigationHubScreen';
import InvestmentScreen from './Investment/InvestmentScreen';
import LoginScreen from './LoginScreen';
import FinanceOverviewScreen from './FinanceOverviewScreen';
import SignupScreen from './SignupScreen';
import UIComponentsScreen from './UIComponentsScreen';

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
  activeColor = '#0a0a0a',
  inactiveColor = 'rgba(10, 10, 10, 0.5)',
  onPress,
  onLongPress,
}: {
  label: string;
  focused: boolean;
  activeColor?: string;
  inactiveColor?: string;
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

    // Ripple burst — expand a dark circle from center, fade out
    rippleScale.setValue(0);
    rippleOpacity.setValue(0.15);
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
            backgroundColor: activeColor,
            opacity: rippleOpacity,
            transform: [{ scale: rippleScale }],
          }}
        />
        {/* Icon with squish */}
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons
            name={(focused ? filled : outline) as any}
            size={focused ? 26 : 22}
            color={focused ? activeColor : inactiveColor}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// ── Custom tab bar ────────────────────────────────────────────────────────────

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute bottom-8 left-0 right-0 items-center px-4" pointerEvents="box-none">
      <View
        className="w-full max-w-sm overflow-hidden rounded-[100px] border-[1.5px] border-white/50 shadow-2xl"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 15,
          elevation: 10,
        }}
      >
        <BlurView
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <View className="flex-row items-center justify-evenly h-[56px] px-2 bg-white/5">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const activeColor = options.tabBarActiveTintColor || '#0a0a0a';
            const inactiveColor = options.tabBarInactiveTintColor || 'rgba(10, 10, 10, 0.5)';

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
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                onPress={onPress}
                onLongPress={onLongPress}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

// ── Tab navigator ─────────────────────────────────────────────────────────────

function TabNavigator({ navigation }: { navigation: any }) {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#0a0a0a',
        tabBarInactiveTintColor: 'rgba(10, 10, 10, 0.5)'
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          // Example: If HomeScreen has a dark background, uncomment these lines
          // tabBarActiveTintColor: '#ffffff',
          // tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)'
        }}
      />
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

import { useSelector } from 'react-redux';
import { RootState } from '../store';

const BottomNavbarScreen = () => {
  // Navigation Controller intercepting user session
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {isAuthenticated ? (
          // ── App authenticated stack ───────────────────────────────────────
          <>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
            <Stack.Screen name="Investment" component={InvestmentScreen} />
            <Stack.Screen name="FinanceOverview" component={FinanceOverviewScreen} />
            <Stack.Screen name="UIComponents" component={UIComponentsScreen} />
          </>
        ) : (
          // ── Auth fallback unauthenticated stack ───────────────────────────
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ animation: 'slide_from_bottom' }} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavbarScreen;
