import { useCallback } from 'react';

import { FloatingPlayer } from '@/components';
import { playbackService } from '@/constants/playbackService';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayer';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { Slot, SplashScreen } from 'expo-router';
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
        <Slot />
        <FloatingPlayer />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
