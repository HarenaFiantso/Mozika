import { FC, useEffect } from 'react';

import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type MovingTextProps = {
  text: string;
  animationThreshold: number;
};

export const MovingText: FC<MovingTextProps> = ({ text, animationThreshold }) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;

  const textWidth = text.length * 3;

  useEffect(() => {
    if (!shouldAnimate) return;

    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [translateX, text, animationThreshold, shouldAnimate, textWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        animatedStyle,
        shouldAnimate && {
          width: 9999,
          paddingLeft: 16,
        },
        {
          color: '#fff',
          fontSize: 18,
          fontWeight: '600',
          paddingLeft: 10,
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
};
