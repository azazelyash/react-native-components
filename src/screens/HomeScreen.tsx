import { View, Text, FlatList, StatusBar, Dimensions, Image, ScrollView } from 'react-native';
import React from 'react';
import images from '../assets/images/images'
import { useNavigation } from '@react-navigation/native';
import Animated, { Extrapolation, FadeIn, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import MapList from '../components/MapList';
import { headerPageText, subtitle1, subtitle2, title } from '../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const { height: sHeight, width: sWidth } = Dimensions.get('screen')
const ImageHeight = sHeight * 0.35

const HomeScreen = () => {
  const navigation = useNavigation()
  const scrollY = useSharedValue(0)
  const insets = useSafeAreaInsets();

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const scrollAnimatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 320],
      [0, -ImageHeight],
      Extrapolation.CLAMP
    )

    return { transform: [{ translateY }] }
  })

  const headerViewAnimatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, 320],
      ['transparent', Colors.darkGray]
    )

    const paddingTop = interpolate(
      scrollY.value,
      [0, 320],
      [12, insets.top + 12],
      Extrapolation.CLAMP
    )

    return { backgroundColor, paddingTop, paddingBottom: 12 }
  })

  const titleAnimatedStyles = (fadeIn: boolean) =>
    useAnimatedStyle(() => {

      const outputRange = fadeIn ? [0, 0, 1] : [1, 0, 0]

      const opacity = interpolate(
        scrollY.value,
        [0, 120, 320],
        outputRange
      )

      return { opacity }
    })

  const animatedImageStyles = useAnimatedStyle(() => {

    const scale = interpolate(
      scrollY.value,
      [0, 320],
      [1.4, 1],
      { extrapolateRight: Extrapolation.CLAMP }
    )

    return { transform: [{ scale }] }
  })

  return (
    <View className="flex flex-1">
      <Animated.View
        style={[animatedImageStyles]}
        className="w-full items-center justify-center"
      >

        <Image
          source={images.headerImg}
          resizeMode="cover"
          style={{ width: sWidth, zIndex: -1, height: ImageHeight }}
        />

        <LinearGradient
          colors={['transparent', 'transparent', Colors.black]}
          className="absolute inset-0"
          style={{ height: ImageHeight }}
        />

      </Animated.View>


      <Animated.View style={scrollAnimatedStyles}>

        <Animated.View
          style={[headerViewAnimatedStyles]}
          className="w-full justify-center"
        >

          <View>

            <Animated.Text
              style={[titleAnimatedStyles(false)]}
              className="absolute text-[34px] font-semibold text-white mx-5"
            >
              {title}
            </Animated.Text>

            <Animated.Text
              style={[titleAnimatedStyles(true)]}
              className="text-[16px] font-medium text-white mx-5 my-2"
            >
              {title}
            </Animated.Text>

          </View>

        </Animated.View>


        <Animated.ScrollView
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
          className="bg-black z-10"
        >

          <View className="m-5">

            <Text className="text-[20px] text-white font-semibold">
              {subtitle1}
            </Text>

            <Text className="text-[16px] text-white mt-2.5 font-semibold">
              {subtitle2}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-[30px]">

              <MapList
                fragment
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={(item, index) => (

                  <Animated.View
                    key={index}
                    entering={FadeIn.duration(400).delay(index * 300)}
                    className="w-[100px] h-[100px] rounded-[14px] mr-4"
                    style={{ backgroundColor: Colors.darkGray }}
                  />

                )}
              />

            </ScrollView>

            <Text className="text-[16px] text-white/60 text-justify">
              {headerPageText}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-[30px]">

              <MapList
                fragment
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={(item, index) => (

                  <Animated.View
                    key={index}
                    entering={FadeIn.duration(400).delay(index * 300)}
                    className="w-[100px] h-[100px] rounded-[14px] mr-4"
                    style={{ backgroundColor: Colors.darkGray }}
                  />

                )}
              />

            </ScrollView>

            <Text className="text-[16px] text-white/60 text-justify">
              {headerPageText}
            </Text>

            <Text className="text-[16px] text-white/60 text-justify mt-[30px]">
              {headerPageText}
            </Text>

          </View>

        </Animated.ScrollView>

      </Animated.View>
    </View>
  );
};

export default HomeScreen;
