import { FC } from 'react';

import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { FontAwesome6 } from '@expo/vector-icons';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const PlayPauseButton: FC<PlayerButtonProps> = ({ style, iconSize = 48 }) => {
  const { playing } = useIsPlaying();

  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton: FC<PlayerButtonProps> = ({ iconSize = 30 }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
      <FontAwesome6 name="forward" size={iconSize} color="white" />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton: FC<PlayerButtonProps> = ({ iconSize = 30 }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
      <FontAwesome6 name={'backward'} size={iconSize} color="white" />
    </TouchableOpacity>
  );
};

export const PlayerControls: FC<PlayerButtonProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton />

        <PlayPauseButton />

        <SkipToNextButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
