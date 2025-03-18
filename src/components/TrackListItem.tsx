import { FC, useState } from 'react';

import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { unknownTrackImageUri } from '@/constants/images';
import { Entypo, Ionicons } from '@expo/vector-icons';
import LoaderKit from 'react-native-loader-kit';
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player';
import { StopPropagation } from '@/components/utils/StopPropagation';
import { TrackShortcutsMenu } from '@/components/TrackShortcutsMenu';

import { TrackShortcutsMenu } from '@/components/TrackShortcutsMenu';
import { StopPropagation } from '@/components/utils/StopPropagation';

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
  const [artworkError, setArtworkError] = useState(false);

  const handleImageError = () => {
    setArtworkError(true);
  };

  return (
    <TouchableHighlight onPress={() => handleTrackSelect(track)}>
      <View style={styles.trackItemContainer}>
        <View>
          <Image
            source={{
              uri: artworkError ? unknownTrackImageUri : track.artwork,
            }}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
            onError={handleImageError}
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
          <StopPropagation>
            <TrackShortcutsMenu>
              <Entypo name="dots-three-horizontal" size={18} color="white" />
            </TrackShortcutsMenu>
          </StopPropagation>
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
