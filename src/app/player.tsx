import { useState } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import {
  DismissPlayerSymbol,
  MovingText,
  PlayerControls,
  PlayerProgressBar,
  PlayerRepeatToggle,
  PlayerVolumeBar,
} from '@/components';
import { unknownTrackImageUri } from '@/constants/images';
import { usePlayerBackground } from '@/hooks/usePlayerBackground';
import { LinearGradient } from 'expo-linear-gradient';
import { ReanimatedLogLevel, configureReanimatedLogger } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActiveTrack } from 'react-native-track-player';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function Player() {
  const activeTrack = useActiveTrack();
  // TODO: Fix this correctly to get the dominant color from the current active track's artwork.
  const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri);
  const { top, bottom } = useSafeAreaInsets();

  const [artworkError, setArtworkError] = useState(false);

  const handleImageError = () => {
    setArtworkError(true);
  };

  return (
    <LinearGradient
      className="flex-1"
      colors={imageColors ? [imageColors.primary, imageColors.secondary] : ['#056070', '#000']}
    >
      <View style={styles.overlayContainer}>
        <DismissPlayerSymbol />

        <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
          <View style={styles.artworkImageContainer}>
            <Image
              source={{
                uri: artworkError ? unknownTrackImageUri : activeTrack?.artwork,
              }}
              resizeMode="cover"
              style={styles.artworkImage}
              onError={handleImageError}
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 'auto' }}>
            <View style={{ height: 60 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={styles.trackTitleContainer}>
                  <MovingText
                    text={activeTrack?.title ?? ''}
                    animationThreshold={30}
                    style={styles.trackTitleText}
                  />
                </View>
              </View>
              {activeTrack?.artist && (
                <Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
                  {activeTrack.artist}
                </Text>
              )}
            </View>
            <PlayerProgressBar style={{ marginTop: 32 }} />
            <PlayerControls style={{ marginTop: 40 }} />
          </View>
          <PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 30 }} />
          <View style={styles.centeredRow}>
            <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  trackTitleText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  trackArtistText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.8,
    maxWidth: '90%',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
