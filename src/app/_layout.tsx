import { FloatingPlayer } from '@/components';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <>
      <Slot />
      <FloatingPlayer />
    </>
  );
}
