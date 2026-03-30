import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface AnimatedCheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string; // override wrapper
  disabled?: boolean;
}

export const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  label,
  checked,
  onChange,
  className = '',
  disabled = false,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const checkScale = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: checked ? 1 : 0,
      speed: 24,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  }, [checked]);

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
    if (!disabled) {
      onChange(!checked);
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
          className={`w-6 h-6 rounded-[8px] border-[1.5px] items-center justify-center ${checked ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300 bg-transparent'}`}
        >
          <Animated.View style={{ opacity: checkScale, transform: [{ scale: checkScale }] }}>
            <Ionicons name="checkmark" size={16} color="white" />
          </Animated.View>
        </Animated.View>
        {label && (
          <Text className="ml-3 text-zinc-800 text-[15px] font-medium flex-shrink">{label}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
