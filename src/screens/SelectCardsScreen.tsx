import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Contact, contacts } from '../constants/contacts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



type ContactItemProps = {
  item: Contact
  index: number
}

const ContactItem = ({ item, index }: ContactItemProps) => {

  return (

    <Animated.View
      entering={FadeInDown.duration(500).delay(index * 80)}
      className="flex-1 p-2"
    >

      <TouchableOpacity className="bg-white rounded-xl p-4 flex-row items-center shadow">

        <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">

          <Text className="text-white font-bold">
            {item.name.slice(0, 1).toUpperCase()}
          </Text>

        </View>

        <View className="ml-3 flex-1">

          <Text className="font-semibold text-base text-black" numberOfLines={1}>
            {item.name}
          </Text>

          <Text className="text-sm text-gray-500">
            {item.number}
          </Text>

        </View>

      </TouchableOpacity>

    </Animated.View>
  )
}

const SelectCardsScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [screenKey, setScreenKey] = useState(0);
  const insets = useSafeAreaInsets();

  const onRefresh = useCallback(() => {

    setRefreshing(true);

    setTimeout(() => {

      setScreenKey(prev => prev + 1);
      setRefreshing(false);

    }, 1000);

  }, []);

  const renderItem = ({ item, index }: { item: Contact; index: number }) => (
    <ContactItem item={item} index={index} />
  )

  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: insets.top }}>

      <View className="flex-1 p-2">

        <FlatList
          contentContainerStyle={{ paddingBottom: insets.bottom + 48 }}
          data={contacts}
          key={screenKey}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}

          refreshing={refreshing}
          onRefresh={onRefresh}
        />

      </View>
    </View>
  )
};

export default SelectCardsScreen;
