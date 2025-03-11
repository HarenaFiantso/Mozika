import { Text, View } from 'react-native';

import '@/global.css';

export default function RootLayout() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold underline">
        Hello, this is the first test with Mozika
      </Text>
    </View>
  );
}
