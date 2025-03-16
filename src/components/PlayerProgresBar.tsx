import { StyleSheet, Text, View, ViewProps } from 'react-native';

import { formatSecondsToMinutes } from '@/utils/miscellanous';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import TrackPlayer, { useProgress } from 'react-native-track-player';

export const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250);

  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={styles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          minimumTrackTintColor: 'rgba(255,255,255,0.6)',
          maximumTrackTintColor: 'rgba(255,255,255,0.4)',
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async value => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async value => {
          if (!isSliding.value) return;

          isSliding.value = false;

          await TrackPlayer.seekTo(value * duration);
        }}
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>

        <Text style={styles.timeText}>
          {'-'} {trackRemainingTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: 7,
    borderRadius: 16,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 20,
  },
  timeText: {
    color: 'white',
    opacity: 0.75,
    fontSize: 16,
    letterSpacing: 0.7,
    fontWeight: '500',
  },
});
