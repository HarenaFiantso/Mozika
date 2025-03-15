import { ScrollView, View } from 'react-native';

import { TrackList } from '@/components/TrackList';

export const Tracks = () => {
  return (
    <View className="flex-1">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: 24 }}
        nestedScrollEnabled={true}
      >
        <TrackList id={''} tracks={[]} />
      </ScrollView>
    </View>
  );
};
