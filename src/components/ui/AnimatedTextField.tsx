import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Text, Animated, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface AnimatedTextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  leadingIcon?: React.ReactNode;
  isPassword?: boolean;
}

export const AnimatedTextField: React.FC<AnimatedTextFieldProps> = ({
  label,
  error,
  className = '',
  inputClassName = '',
  leadingIcon,
  isPassword,
  value,
  secureTextEntry: initialSecure,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isObscured, setIsObscured] = useState(isPassword || initialSecure);
  
  // label animation
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(() => {
    if (error) {
      shakeAnimation.setValue(0);
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 40, useNativeDriver: true })
      ]).start();
    }
  }, [error]);

  const hasLeading = !!leadingIcon;
  const initialLeft = hasLeading ? 42 : 16;

  const labelStyle = {
    position: 'absolute',
    left: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [initialLeft, 12],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#71717a', error ? '#ef4444' : '#52525b'], 
    }),
    backgroundColor: '#ffffff', // Required to break the border line
    paddingHorizontal: 4,
    zIndex: 10,
  };

  const borderColor = error ? 'border-red-400' : isFocused ? 'border-zinc-800' : 'border-zinc-300';
  const borderWidth = isFocused && !error ? 'border-[1.5px]' : 'border-[1px]';

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }} className={`mb-4 w-full ${className}`}>
      {/* Container MUST NOT have overflow-hidden so the label can float above the border */}
      <View className={`relative ${borderWidth} rounded-xl h-[56px] flex-row items-center bg-white ${borderColor}`}>
        
        {leadingIcon && (
          <View className="pl-4 pr-1">
            {leadingIcon}
          </View>
        )}

        {/* The floating label */}
        <Animated.Text style={labelStyle as any} className="font-medium pointer-events-none">
          {label}
        </Animated.Text>
        
        <TextInput
          className={`flex-1 px-4 text-[15px] text-zinc-900 h-full font-medium ${hasLeading ? 'pl-2' : ''} ${inputClassName}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          selectionColor="#18181b"
          secureTextEntry={isObscured}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity 
            onPress={() => setIsObscured(!isObscured)}
            className="px-4 h-full justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name={isObscured ? 'eye-outline' : 'eye-off-outline'} size={20} color="#71717a" />
          </TouchableOpacity>
        )}

      </View>
      {error !== undefined && error !== '' && (
        <Text className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{error}</Text>
      )}
    </Animated.View>
  );
};
