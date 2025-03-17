import { useMemo } from 'react';

import { ScrollView, View } from 'react-native';

import { PlaylistList } from '@/components';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { usePlaylists } from '@/store/library-store';
import { playlistNameFilter } from '@/utils/filter';
import { Playlist } from '@/utils/types';
import { useRouter } from 'expo-router';

export default function PlaylistScreen() {
  const router = useRouter();

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in playlists',
    },
  });

  const { playlists } = usePlaylists();

  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  const handlePlaylistPress = (playlist: Playlist) => {
    router.push('/playlist');
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: 24,
        }}
      >
        <PlaylistList
          scrollEnabled={false}
          playlists={filteredPlaylists}
          onPlaylistPress={handlePlaylistPress}
        />
      </ScrollView>
    </View>
  );
}
