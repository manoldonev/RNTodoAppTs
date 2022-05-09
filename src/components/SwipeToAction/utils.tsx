// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import type { ViewStyle } from 'react-native';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type RenderActionFunction = (
  progress: Animated.AnimatedInterpolation,
  dragX: Animated.AnimatedInterpolation,
) => JSX.Element;

const renderUnderlay = (
  screenWidth: number,
  containerStyle: ViewStyle,
  position: 'left' | 'right' = 'left',
): RenderActionFunction => {
  return (_progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation): JSX.Element => {
    const width = screenWidth / 2;
    // eslint-disable-next-line react/destructuring-assignment
    const scale = dragX.interpolate({
      inputRange: position === 'left' ? [0, width] : [-width, 0],
      outputRange: position === 'left' ? [0.5, 1] : [1, 0.5],
      extrapolate: 'clamp',
    });

    const alignItems = position === 'left' ? 'flex-start' : 'flex-end';
    const margin = position === 'left' ? { marginLeft: 20 } : { marginRight: 20 };

    return (
      <Animated.View style={[containerStyle, { alignItems }]}>
        <Animated.View style={{ transform: [{ scale }], ...margin }}>
          <Icon name="trash-outline" size={32} color="white" />
        </Animated.View>
      </Animated.View>
    );
  };
};

export { renderUnderlay };
