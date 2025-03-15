import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { MovingText } from '@/components/MovingText';
import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls';

// TODO: Make this component dynamic
export const FloatingPlayer = () => {
  const handlePress = () => {
    console.log('Redirecting to the player screen');
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={styles.container}>
      <Image source={require('assets/images/song_cover.jpg')} style={styles.trackArtworkImage} />
      <View style={styles.trackTitleContainer}>
        <MovingText text="Hafa mihitsy" animationThreshold={25} />
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
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
