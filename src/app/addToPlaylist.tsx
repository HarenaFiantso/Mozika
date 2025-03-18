import { SafeAreaView, StyleSheet } from 'react-native';

import { PlaylistList } from '@/components';
import { usePlaylists, useTracks } from '@/store/library-store';
import { useQueue } from '@/store/queue-store';
import { Playlist } from '@/utils/types';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Snackbar from 'react-native-snackbar';
import TrackPlayer, { Track } from 'react-native-track-player';

export default function AddToPlaylist() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const { activeQueueId } = useQueue();

  const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>();

  const tracks = useTracks();

  const { playlists, addToPlaylist } = usePlaylists();

  const track = tracks.find(currentTrack => trackUrl === currentTrack.url);

  if (!track) {
    return null;
  }

  const availablePlaylists = playlists.filter(
    playlist => !playlist.tracks.some(playlistTrack => playlistTrack.url === track.url)
  );

  const handlePlaylistPress = async (playlist: Playlist) => {
    addToPlaylist(track, playlist.name);

    Snackbar.show({
      numberOfLines: 1,
      backgroundColor: 'green',
      text: 'Playlist added succesfully',
    });

    router.dismiss();

    if (activeQueueId?.startsWith(playlist.name)) {
      await TrackPlayer.add(track);
    }
  };

  return (
    <SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
      <PlaylistList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 24,
  },
});
