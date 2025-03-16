import { StyleSheet, View, ViewProps } from 'react-native';

import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume';
import { Ionicons } from '@expo/vector-icons';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';

export const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = useTrackPlayerVolume();

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  progress.value = volume ?? 0;

  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="volume-low" size={20} color="white" style={{ opacity: 0.8 }} />

        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10 }}>
          <Slider
            progress={progress}
            minimumValue={min}
            containerStyle={styles.slider}
            onValueChange={value => {
              updateVolume(value);
            }}
            renderBubble={() => null}
            theme={{
              maximumTrackTintColor: 'rgba(255,255,255,0.4)',
              minimumTrackTintColor: 'rgba(255,255,255,0.6)',
            }}
            thumbWidth={0}
            maximumValue={max}
          />
        </View>

        <Ionicons name="volume-high" size={20} color="white" style={{ opacity: 0.8 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: 7,
    borderRadius: 16,
  },
});
