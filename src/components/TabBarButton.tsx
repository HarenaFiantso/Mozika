import { FC, useEffect } from 'react';

import { Pressable } from 'react-native';

import { icons } from '@/constants/icons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type TabBarButtonProps = {
  isFocused: boolean;
  label: string;
  routeName: 'index' | 'playlist';
  color: string;

  [key: string]: any;
};
export const TabBarButton: FC<TabBarButtonProps> = ({
  isFocused,
  label,
  routeName,
  color,
  ...props
}) => {
  const scale = useSharedValue(0);
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  return (
    <Pressable {...props} className="flex-1 items-center justify-center gap-1">
      <Animated.View style={animatedIconStyle}>{icons[routeName]({ color })}</Animated.View>
      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};
