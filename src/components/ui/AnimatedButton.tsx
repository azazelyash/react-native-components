import React, { useRef } from 'react';
import { Text, TouchableWithoutFeedback, Animated } from 'react-native';

interface AnimatedButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string; // allow tailwind overrides
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 16,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 16,
      bounciness: 8,
    }).start();
  };

  let bgClass = 'bg-zinc-900';
  let textClass = 'text-white';
  let borderClass = '';

  switch (variant) {
    case 'secondary':
      bgClass = 'bg-zinc-100';
      textClass = 'text-zinc-800';
      break;
    case 'outline':
      bgClass = 'bg-transparent';
      textClass = 'text-zinc-900';
      borderClass = 'border-[1.5px] border-zinc-200';
      break;
    case 'danger':
      bgClass = 'bg-red-500/10';
      textClass = 'text-red-500';
      break;
  }

  if (disabled) {
    bgClass = variant === 'outline' ? 'bg-transparent' : 'bg-zinc-100';
    textClass = 'text-zinc-400';
    borderClass = variant === 'outline' ? 'border-[1.5px] border-zinc-100' : '';
  }

  return (
    <TouchableWithoutFeedback
      onPress={disabled ? undefined : onPress}
      onPressIn={disabled ? undefined : handlePressIn}
      onPressOut={disabled ? undefined : handlePressOut}
    >
      <Animated.View
        className={`rounded-2xl px-6 py-4 items-center justify-center flex-row ${bgClass} ${borderClass} ${className}`}
        style={{ transform: [{ scale }] }}
      >
        <Text className={`text-[15px] font-semibold tracking-wide ${textClass}`}>{label}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
