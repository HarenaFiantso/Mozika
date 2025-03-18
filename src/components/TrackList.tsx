import { FC, useRef } from 'react';

import { FlatList, FlatListProps, Text, View } from 'react-native';

import { useQueue } from '@/store/queue-store';
import TrackPlayer, { Track } from 'react-native-track-player';

import { TrackListItem } from '@/components/TrackListItem';

type TrackListProps = Partial<FlatListProps<Track>> & {
  id: string;
  tracks: Track[];
  hideQueueControls?: boolean;
};

const EmptyComponent = () => (
  <View className="h-full flex-1 items-center justify-center">
    <Text className="mt-20 text-center text-2xl text-white">No songs found</Text>
  </View>
);

const ItemDivider = () => (
  <View
    style={{ borderColor: 'gray', borderWidth: 1, opacity: 0.3, marginVertical: 9, marginLeft: 60 }}
  />
);

export const TrackList: FC<TrackListProps> = ({
  id,
  tracks,
  hideQueueControls = false,
  ...flatListProps
}) => {
  const queueOffset = useRef(0);
  const { activeQueueId, setActiveQueueId } = useQueue();

  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex(track => track.url === selectedTrack.url);

    if (trackIndex === -1) return;

    const isChangingQueue = id !== activeQueueId;

    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      await TrackPlayer.reset();

      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);

      await TrackPlayer.play();

      queueOffset.current = trackIndex;
      setActiveQueueId(id);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      await TrackPlayer.skip(nextTrackIndex);
      await TrackPlayer.play();
    }
  };

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={EmptyComponent}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      maxToRenderPerBatch={20}
      {...flatListProps}
    />
  );
};
