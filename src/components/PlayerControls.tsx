import { FC } from 'react';

import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { FontAwesome6 } from '@expo/vector-icons';

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const PlayPauseButton: FC<PlayerButtonProps> = ({ style, iconSize = 48 }) => {
  const isPlaying = false;

  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity activeOpacity={0.85}>
        <FontAwesome6 name={isPlaying ? 'pause' : 'play'} size={iconSize} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton: FC<PlayerButtonProps> = ({ iconSize = 30 }) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <FontAwesome6 name="forward" size={iconSize} color="white" />
    </TouchableOpacity>
  );
};
