import { View } from 'react-native';

import { FloatingPlayer, TabBar } from '@/components';
import '@/global.css';
import { Tabs } from 'expo-router';

export default function RootLayout() {
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
