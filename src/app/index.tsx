import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-white">Hello, This is the home screen!</Text>
      </View>
    </View>
  );
}
