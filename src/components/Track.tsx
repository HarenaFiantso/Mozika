import { useMemo } from 'react';

import { ScrollView, View } from 'react-native';

import { useTracks } from '@/store/libary';

import { TrackList } from '@/components/TrackList';

export const Tracks = () => {
  const tracks = useTracks();

  console.log(tracks);

  return (
    <View className="flex-1">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: 24 }}
        nestedScrollEnabled={true}
      >
        <TrackList id={''} tracks={tracks} />
      </ScrollView>
    </View>
  );
};
