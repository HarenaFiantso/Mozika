import { ContinueListening, HomeHeader } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';

export default function Home() {
  return (
    <LinearGradient colors={['rgb(23,88,100)', '#000000']} style={{ flex: 1 }}>
      <View className="mt-10 flex-1">
        <HomeHeader />
        <ContinueListening />
      </View>
    </LinearGradient>
  );
}
