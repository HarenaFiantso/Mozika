import { HomeHeader } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <LinearGradient colors={['rgb(23,88,100)', '#000000']} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <HomeHeader />
      </SafeAreaView>
    </LinearGradient>
  );
}
