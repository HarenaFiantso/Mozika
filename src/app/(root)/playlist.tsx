import { useMemo, useState } from 'react';

import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { PlaylistList } from '@/components';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { usePlaylists } from '@/store/library-store';
import { playlistNameFilter } from '@/utils/filter';
import { Playlist } from '@/utils/types';
import { useRouter } from 'expo-router';
import Snackbar from 'react-native-snackbar';

export default function PlaylistScreen() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = () => {
    if (playlistName.trim() !== '') {
      createPlaylist(playlistName);
      setModalVisible(false);
      setPlaylistName('');
    }
  };

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Search in playlist',
    },
  });

  const { playlists, createPlaylist } = usePlaylists();

  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  const handlePlaylistPress = (playlist: Playlist) => {
    router.push('/playlist');
  };

  const handleImport = () => {
    return Snackbar.show({
      text: 'This functionality will be available soon',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#053345FF',
    });
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
        <View className="gap-5">
          <TouchableOpacity
            className="items-center justify-center rounded-2xl bg-white py-4"
            onPress={() => setModalVisible(true)}
          >
            <Text className="font-bold text-black">Create empty playlist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-center rounded-2xl bg-white py-4"
            onPress={handleImport}
          >
            <Text className="font-bold text-black">Import</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="slide">
        <View className="flex-1 items-center justify-center bg-black/80">
          <View className="w-3/4 rounded-xl bg-white p-10">
            <Text className="mb-10 text-2xl font-bold text-black">New Playlist Name</Text>
            <TextInput
              className="border-b-2 border-b-gray-600 text-black"
              placeholder="Enter playlist name"
              value={playlistName}
              placeholderTextColor="black"
              onChangeText={setPlaylistName}
            />
            <View className="mt-10 flex-row justify-between">
              <TouchableOpacity
                className="rounded-2xl bg-black px-5 py-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-2xl bg-black px-5 py-2"
                onPress={handleCreatePlaylist}
              >
                <Text className="text-white">Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
