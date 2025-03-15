import { useEffect } from 'react';

import { ScrollView, View } from 'react-native';

import { useLibraryStore, useTracks } from '@/store/libary';
import { generateTracksListId } from '@/utils/miscellanous';

import { TrackList } from '@/components/TrackList';

export const Tracks = () => {
  const tracks = useLibraryStore(state => state.tracks);
  const fetchTracks = useLibraryStore(state => state.fetchTracks);

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <View className="flex-1">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: 24 }}
        nestedScrollEnabled={true}
      >
        <TrackList id={generateTracksListId('songs')} tracks={tracks} />
      </ScrollView>
    </View>
  );
};
