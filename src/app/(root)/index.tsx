import { Text, View } from 'react-native';

import { useUserStore } from '@/stores';

export default function Home() {
  const { name } = useUserStore();

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-2xl font-bold text-white">Hello, {name}!</Text>
    </View>
  );
}
