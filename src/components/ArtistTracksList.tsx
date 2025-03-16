import { useMemo } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { trackTitleFilter } from '@/utils/filter';
import { generateTracksListId } from '@/utils/miscellanous';
import { Artist } from '@/utils/types';

import { QueueControls } from '@/components/QueueControls';
import { TrackList } from '@/components/TrackList';

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: 'Search a song',
    },
  });

  const filteredArtistTracks = useMemo(() => {
    return artist.tracks.filter(trackTitleFilter(search));
  }, [artist.tracks, search]);

  return (
    <TrackList
      id={generateTracksListId(artist.name)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.artistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <Image
              source={require('assets/images/Lofi-Urban-Nightscape.png')}
              style={styles.artistImage}
            />
          </View>

          <Text numberOfLines={1} style={styles.artistNameText}>
            {artist.name}
          </Text>
          {search.length === 0 && (
            <QueueControls tracks={filteredArtistTracks} style={{ paddingTop: 24 }} />
          )}
        </View>
      }
      tracks={filteredArtistTracks}
    />
  );
};

const styles = StyleSheet.create({
  artistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200,
  },
  artistImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  artistNameText: {
    color: 'white',
    marginTop: 22,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
  },
});
