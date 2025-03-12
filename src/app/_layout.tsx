import '@/global.css';
import { Stack } from 'expo-router';
import MigrationLayout from '@/services/db/MigrationLayout';

export default function RootLayout() {
  return (
    <MigrationLayout>
      <Stack screenOptions={{ animation: 'slide_from_right' }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="whoami" options={{ headerShown: false }} />
      </Stack>
    </MigrationLayout>
  );
}
