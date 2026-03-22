import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { AnimatedDialog } from '../components/AnimatedDialog';
import { AnimatedBottomSheet } from '../components/AnimatedBottomSheet';


// ── Nav item config ───────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    label: 'Send Money',
    description: 'Transfer funds to anyone',
    icon: 'cash-outline',
    screen: 'SendMoney',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    label: 'Investments',
    description: 'Explore funds & portfolios',
    icon: 'trending-up-outline',
    screen: 'Investment',
    color: '#b8972e',
    bg: '#fef9e7',
  },
  {
    label: 'Select Cards',
    description: 'Manage your saved cards',
    icon: 'card-outline',
    screen: 'SelectCards',
    color: '#0ea5e9',
    bg: '#e0f2fe',
  },
  {
    label: 'Home',
    description: 'Go back to the home feed',
    icon: 'home-outline',
    screen: 'Home',
    color: '#10b981',
    bg: '#d1fae5',
  },
];

// ── Screen ────────────────────────────────────────────────────────────────────

const NavigationHubScreen = () => {
  const navigation = useNavigation<any>();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9ff' }}>
      <ScrollView
        contentContainerStyle={{ 
          paddingTop: insets.top + 24, 
          paddingBottom: insets.bottom + 120, 
          paddingHorizontal: 24 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#0f0f0f',
              letterSpacing: -0.5,
            }}
          >
            Quick Nav
          </Text>
          <Text style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
            Jump anywhere in the app
          </Text>
          <View
            style={{
               width: 36,
               height: 3,
               borderRadius: 2,
               backgroundColor: '#6366f1',
               marginTop: 10,
               marginBottom: 24,
            }}
          />

          {/* New Triggers */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={() => setDialogVisible(true)}
              style={{ flex: 1, backgroundColor: '#0f0f0f', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Show Alert</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSheetVisible(true)}
              style={{ flex: 1, backgroundColor: '#f97316', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Bottom Sheet</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Nav buttons */}
        {NAV_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.screen}
            onPress={() => {
              if (item.screen === 'SendMoney') {
                return navigation.navigate('SendMoney');
              }
              return navigation.navigate(item.screen);
            }}
            activeOpacity={0.75}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 18,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: '#ebebf0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            {/* Icon chip */}
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: item.bg,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              <Ionicons name={item.icon as any} size={22} color={item.color} />
            </View>

            {/* Text */}
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 16, fontWeight: '700', color: '#0f0f0f' }}
              >
                {item.label}
              </Text>
              <Text
                style={{ fontSize: 13, color: '#888', marginTop: 2 }}
                numberOfLines={1}
              >
                {item.description}
              </Text>
            </View>

            {/* Arrow */}
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Overlays */}
      <AnimatedDialog
        visible={isDialogVisible}
        title="Premium Access"
        message="Upgrade to premium to unlock advanced portfolio analytics and zero-fee transfers."
        confirmText="Upgrade Now"
        cancelText="Maybe Later"
        onClose={() => setDialogVisible(false)}
        onConfirm={() => console.log('Upgraded')}
      />

      <AnimatedBottomSheet visible={isSheetVisible} onClose={() => setSheetVisible(false)}>
        <View style={{ paddingBottom: 40 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', marginBottom: 16, color: '#0f0f0f' }}>Notifications</Text>
          {Array.from({ length: 15 }).map((_, i) => (
            <View key={i} style={{ flexDirection: 'row', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                <Ionicons name="notifications-outline" size={20} color="#6366f1" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>System Update {i + 1}</Text>
                <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Your account was successfully logged in from a new device.</Text>
              </View>
            </View>
          ))}
        </View>
      </AnimatedBottomSheet>
    </View>

  );
};

export default NavigationHubScreen;
