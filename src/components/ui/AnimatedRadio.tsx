import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';

interface AnimatedRadioProps {
  label?: string;
  selected: boolean;
  onChange: (selected: boolean) => void;
  className?: string; // override wrapper
  disabled?: boolean;
}

export const AnimatedRadio: React.FC<AnimatedRadioProps> = ({
  label,
  selected,
  onChange,
  className = '',
  disabled = false,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const innerDotScale = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(innerDotScale, {
      toValue: selected ? 1 : 0,
      speed: 24,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    if (!disabled && !selected) {
      onChange(true);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={disabled ? undefined : handlePressIn}
      onPressOut={disabled ? undefined : handlePressOut}
    >
      <View className={`flex-row items-center pt-2 pb-2 ${disabled ? 'opacity-40' : ''} ${className}`}>
        <Animated.View
          style={{ transform: [{ scale }] }}
          className={`w-[22px] h-[22px] rounded-full border-[1.5px] items-center justify-center ${selected ? 'border-zinc-900' : 'border-zinc-300 bg-transparent'}`}
        >
          <Animated.View
            style={{ transform: [{ scale: innerDotScale }] }}
            className="w-[10px] h-[10px] rounded-full bg-zinc-900"
          />
        </Animated.View>
        {label && (
          <Text className="ml-3 text-zinc-800 text-[15px] font-medium flex-shrink">{label}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
