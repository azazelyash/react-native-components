import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchUsers, ApiUser } from '../store/slices/usersSlice';

type ContactItemProps = {
  item: ApiUser;
  index: number;
}

const ContactItem = ({ item, index }: ContactItemProps) => {

  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(index * 80)}
      className="flex-1 p-2 max-w-[50%]"
    >
      <TouchableOpacity className="bg-white rounded-xl p-4 flex-col items-center shadow h-48 justify-center">
        <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mb-3 overflow-hidden">
          {item.photo ? (
            <Image
              source={{ uri: item.photo }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-white font-bold text-lg">
              {item.name.slice(0, 1).toUpperCase()}
            </Text>
          )}
        </View>

        <View className="items-center w-full">
          <Text className="font-semibold text-base text-black text-center" numberOfLines={1}>
            {item.name}
          </Text>

          <Text className="text-xs text-gray-500 text-center mt-1" numberOfLines={1}>
            {item.company}
          </Text>

          <Text className="text-xs text-gray-400 text-center mt-1" numberOfLines={1}>
            {item.phone}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const SelectCardsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();

  const { data: users, loading, error } = useSelector((state: RootState) => state.users);

  // We track local refreshing state to show refreshing spinner without blocking
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (users.length === 0 && !loading && !error) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length, loading, error]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchUsers());
    setRefreshing(false);
  }, [dispatch]);

  const renderItem = ({ item, index }: { item: ApiUser; index: number }) => (
    <ContactItem item={item} index={index} />
  )

  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: insets.top }}>
      {loading && users.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error && users.length === 0 ? (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-red-500 text-xl font-bold text-center mb-2">
            Oops! Something went wrong.
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            {error || 'Failed to load users. Please try again.'}
          </Text>
          <TouchableOpacity
            className="bg-primary px-8 py-3 rounded-xl shadow-sm active:opacity-80"
            onPress={() => dispatch(fetchUsers())}
          >
            <Text className="text-white font-semibold text-base">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 p-2">
          <FlatList
            contentContainerStyle={{ paddingBottom: insets.bottom + 48 }}
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      )}
    </View>
  )
};

export default SelectCardsScreen;

