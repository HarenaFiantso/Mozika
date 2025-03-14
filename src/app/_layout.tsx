import { Pressable, Text, View } from 'react-native';

import { TabBar } from '@/components';
import '@/global.css';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';

export default function RootLayout() {
  return (
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
          <View className="flex-row gap-5">
            <Pressable className="pr-5">
              <Ionicons name="search" size={20} color="white" />
            </Pressable>
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
  );
}
