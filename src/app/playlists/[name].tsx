import { ScrollView, StyleSheet, View } from 'react-native';

import { PlaylistTracksList } from '@/components';
import { usePlaylists } from '@/store/library-store';
import { Redirect, useLocalSearchParams } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default function PlaylistScreen() {
  const { name: playlistName } = useLocalSearchParams<{ name: string }>();

  const { playlists } = usePlaylists();

  const playlist = playlists.find(playlist => playlist.name === playlistName);

  if (!playlist) {
    console.warn(`Playlist ${playlistName} was not found!`);

    return <Redirect href={'/(root)/playlist'} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: 24 }}>
        <PlaylistTracksList playlist={playlist} />
      </ScrollView>
    </View>
  );
}
