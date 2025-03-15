import { ScrollView, View } from 'react-native';

import { useTracks } from '@/store/libary';
import { generateTracksListId } from '@/utils/miscellanous';

import { TrackList } from '@/components/TrackList';

export const Tracks = () => {
  const tracks = useTracks();

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
