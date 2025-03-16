import { useEffect, useState } from 'react';

import { Pressable, TextInput, View } from 'react-native';

import { FloatingPlayer, TabBar } from '@/components';
import '@/global.css';
import { useLibraryStore } from '@/store/library-store';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function RootLayout() {
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const filterCondition = useLibraryStore(state => state.setFilterConditions);

  useEffect(() => {
    filterCondition({
      title: search,
      album: search,
      artist: search,
    });
  }, [search]);

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerLeft: () => (
            <Pressable className="mr-5 pl-5">
              <Ionicons name="menu" size={20} color="gray" />
            </Pressable>
          ),
          headerRight: () => (
            <View className="flex-row items-center gap-5">
              {onSearch ? (
                <TextInput
                  autoFocus
                  onBlur={() => setOnSearch(true)}
                  placeholder="Rechercher..."
                  onChangeText={setSearch}
                  className="w-48 rounded-lg border-2 border-gray-300 p-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <Pressable onPress={() => setOnSearch(true)} className="pr-5">
                  <Ionicons name="search" size={20} color="white" />
                </Pressable>
              )}
              <Pressable className="pr-5">
                <Entypo name="dots-three-vertical" size={20} color="white" />
              </Pressable>
            </View>
          ),
        }}
        tabBar={props => <TabBar {...props} />}
      >
        <Tabs.Screen name="index" options={{ title: 'Library' }} />
        <Tabs.Screen name="playlist" options={{ title: 'Playlists' }} />
      </Tabs>
      <FloatingPlayer />
    </View>
  );
}
