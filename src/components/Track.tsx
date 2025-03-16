import { useEffect, useMemo } from 'react';

import { ScrollView, View } from 'react-native';

import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { useLibraryStore, useTracks } from '@/store/library-store';
import { trackTitleFilter } from '@/utils/filter';
import { generateTracksListId } from '@/utils/miscellanous';

import { TrackList } from '@/components/TrackList';

export const Tracks = () => {
  const tracks = useTracks();
  const fetchTracks = useLibraryStore(state => state.fetchTracks);

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Search a song',
    },
  });

  const filteredTracks = useMemo(() => {
    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search, tracks]);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  return (
    <View className="flex-1">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: 24 }}
        nestedScrollEnabled={true}
      >
        <TrackList
          id={generateTracksListId('songs')}
          tracks={filteredTracks}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};
