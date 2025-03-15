import { FC } from 'react';

import { FlatList, FlatListProps, Image, Text, View } from 'react-native';

import { Track } from 'react-native-track-player';

type TrackListProps = Partial<FlatListProps<Track>> & {
  id: string;
  tracks: Track[];
  hideQueueControls?: boolean;
};

const EmptyComponent = () => (
  <View className="items-center">
    <Text className="mt-20 text-center text-2xl text-white">No songs found</Text>

    <Image source={require('assets/images/icon.png')} style={{ width: 200, height: 200 }} />
  </View>
);

export const TrackList: FC<TrackListProps> = ({
  id,
  tracks,
  hideQueueControls = false,
  ...flatListProps
}) => {
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListEmptyComponent={EmptyComponent}
      {...flatListProps}
    />
  );
};
