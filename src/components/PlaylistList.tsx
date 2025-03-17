import { FC, useMemo } from 'react';

import { FlatList, FlatListProps, Text, View } from 'react-native';

import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { playlistNameFilter } from '@/utils/filter';
import { Playlist } from '@/utils/types';

import { PlaylistListItem } from '@/components/PlaylistListItem';

type PlaylistListProps = {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
} & Partial<FlatListProps<Playlist>>;

export const PlaylistList: FC<PlaylistListProps> = ({
  playlists,
  onPlaylistPress: handlePlaylistPress,
  ...flatListProps
}) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in playlist',
    },
  });

  const filteredPlaylist = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListEmptyComponent={
        <View className="items-center justify-center">
          <Text className="text-white" style={{ fontSize: 20 }}>
            No playlist found
          </Text>
        </View>
      }
      data={filteredPlaylist}
      renderItem={({ item: playlist }) => (
        <PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
      )}
      {...flatListProps}
    />
  );
};
