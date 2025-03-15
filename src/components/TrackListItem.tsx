import { FC } from 'react';

import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { unknownTrackImageUri } from '@/constants/images';
import { Ionicons } from '@expo/vector-icons';
import LoaderKit from 'react-native-loader-kit';
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player';

type TrackListItemProps = {
  track: Track;
  onTrackSelect: (track: Track) => void;
};

export const TrackListItem: FC<TrackListItemProps> = ({
  track,
  onTrackSelect: handleTrackSelect,
}) => {
  const { playing } = useIsPlaying();

  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
    <TouchableHighlight onPress={() => handleTrackSelect(track)}>
      <View style={styles.trackItemContainer}>
        <View>
          <Image
            source={{
              uri: track.artwork ?? unknownTrackImageUri,
            }}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />

          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                name="LineScaleParty"
                color="white"
              />
            ) : (
              <Ionicons style={styles.trackPausedIndicator} name="play" size={24} color="white" />
            ))}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ width: '100%' }}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.trackTitleText,
                color: 'white',
              }}
            >
              {track.title}
            </Text>

            {track.artist && (
              <Text numberOfLines={1} style={styles.trackArtistText}>
                {track.artist}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    paddingRight: 20,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackPlayingIconIndicator: {
    position: 'absolute',
    top: 18,
    left: 16,
    width: 16,
    height: 16,
  },
  trackPausedIndicator: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  trackTitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    maxWidth: '90%',
  },
  trackArtistText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 4,
  },
});
