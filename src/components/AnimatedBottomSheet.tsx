import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SNAP_HALF = SCREEN_HEIGHT * 0.5;
const SNAP_TOP = SCREEN_HEIGHT * 0.15; // leaves 15% top padding when fully expanded

interface AnimatedBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const AnimatedBottomSheet: React.FC<AnimatedBottomSheetProps> = ({
  visible,
  onClose,
  children,
}) => {
  const [show, setShow] = useState(visible);
  // Track continuous position
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isExpandedRef = useRef(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      isExpandedRef.current = false;
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(panY, {
          toValue: SNAP_HALF,
          friction: 9,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (show) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(panY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShow(false);
      });
    }
  }, [visible, panY, fadeAnim, show]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Require a vertical drag to activate sheet movement (ignoring taps)
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const startY = isExpandedRef.current ? SNAP_TOP : SNAP_HALF;
        let newY = startY + gestureState.dy;

        // Add resistance at the top
        if (newY < SNAP_TOP) {
          newY = SNAP_TOP - Math.pow(SNAP_TOP - newY, 0.7);
        }

        panY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = 120; // required pixels to switch
        const velocityThreshold = 1.0;
        let toValue = SNAP_HALF; // defaults back to middle

        const draggedUp = gestureState.dy < -threshold || gestureState.vy < -velocityThreshold;
        const draggedDown = gestureState.dy > threshold || gestureState.vy > velocityThreshold;

        if (draggedUp) {
          toValue = SNAP_TOP;
          isExpandedRef.current = true;
        } else if (draggedDown) {
          if (isExpandedRef.current) {
            toValue = SNAP_HALF;
            isExpandedRef.current = false;
          } else {
            // Close completely from middle
            onClose();
            return;
          }
        } else {
          // Fallback to current snapped location depending on ref state
          toValue = isExpandedRef.current ? SNAP_TOP : SNAP_HALF;
        }

        Animated.spring(panY, {
          toValue,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  // We want the inner scroll content entirely visible regardless of state
  // Extra paddingBottom helps prevent content cutting off midway.
  const paddingBottom = SCREEN_HEIGHT * 0.5;

  if (!show) return null;

  return (
    <Modal transparent visible={show} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheetContainer,
          {
            transform: [{ translateY: panY }],
          },
        ]}
      >
        <View {...panResponder.panHandlers} style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom, paddingHorizontal: 20, paddingTop: 4 }}
          bounces={true}
          onScrollBeginDrag={() => {
            if (!isExpandedRef.current) {
              isExpandedRef.current = true;
              Animated.spring(panY, {
                toValue: SNAP_TOP,
                friction: 8,
                tension: 50,
                useNativeDriver: true,
              }).start();
            }
          }}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  handleContainer: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  handle: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
  },
});
