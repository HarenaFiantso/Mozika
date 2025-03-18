import { useMemo } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { trackTitleFilter } from '@/utils/filter';
import { generateTracksListId } from '@/utils/miscellanous';
import { Playlist } from '@/utils/types';

import { QueueControls } from '@/components/QueueControls';
import { TrackList } from '@/components/TrackList';

export const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: 'Find in playlist',
    },
  });

  const filteredPlaylistTracks = useMemo(() => {
    return playlist.tracks.filter(trackTitleFilter(search));
  }, [playlist.tracks, search]);

  return (
    <TrackList
      id={generateTracksListId(playlist.name)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.playlistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <Image
              source={{
                uri: playlist.artworkPreview,
              }}
              style={styles.artworkImage}
            />
          </View>

          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.name}
          </Text>

          {search.length === 0 && (
            <QueueControls style={{ paddingTop: 24 }} tracks={playlist.tracks} />
          )}
        </View>
      }
      tracks={filteredPlaylistTracks}
    />
  );
};

const styles = StyleSheet.create({
  playlistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 300,
  },
  artworkImage: {
    width: '85%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  playlistNameText: {
    color: 'white',
    marginTop: 22,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
  },
});
