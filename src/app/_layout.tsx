import { useCallback } from 'react';

import { playbackService } from '@/constants/playbackService';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayer';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { FontAwesome6 } from '@expo/vector-icons';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';

SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => playbackService);

export default function Layout() {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ animation: 'slide_from_right' }}>
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen
            name="artists/[name]"
            options={{
              title: 'Artists',
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
            }}
          />
          <Stack.Screen
            name="player"
            options={{
              presentation: 'card',
              gestureEnabled: true,
              gestureDirection: 'vertical',
              animationDuration: 400,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="playlists/[name]"
            options={{
              title: 'Playlist',
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
            }}
          />
          <Stack.Screen
            name="addToPlaylist"
            options={{
              title: 'Add to playlist',
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
            }}
          />
          <Stack.Screen
            name="notification.click"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
