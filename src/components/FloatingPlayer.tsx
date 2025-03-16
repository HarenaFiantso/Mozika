import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { unknownTrackImageUri } from '@/constants/images';
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack';
import { useRouter } from 'expo-router';
import { useActiveTrack } from 'react-native-track-player';

import { MovingText } from '@/components/MovingText';
import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls';

export const FloatingPlayer = () => {
  const router = useRouter();

  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayedTrack = activeTrack ?? lastActiveTrack;

  const handlePress = () => {
    router.navigate('/player');
  };

  if (!displayedTrack) return null;

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={styles.container}>
      <Image
        source={{
          uri: displayedTrack.artwork ?? unknownTrackImageUri,
        }}
        style={styles.trackArtworkImage}
      />
      <View style={styles.trackTitleContainer}>
        <MovingText
          text={displayedTrack.title ?? ''}
          animationThreshold={25}
          style={styles.trackTitle}
        />
      </View>
      <View style={styles.trackControlsContainer}>
        <PlayPauseButton iconSize={24} />
        <SkipToNextButton iconSize={22} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 8,
    paddingVertical: 10,
  },
  trackArtworkImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 10,
  },
  trackTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
