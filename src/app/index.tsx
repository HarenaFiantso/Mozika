import { Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default function Home() {
  return (
    <LinearGradient colors={['rgb(0,82,82)', '#000000']} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-white">Hello, This is the home screen!</Text>
      </View>
    </LinearGradient>
  );
}
