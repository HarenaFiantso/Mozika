import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

import { Redirect } from 'expo-router';

export default function NotificationClick() {
  return (
    <View className="flex-1 items-center justify-center gap-10 bg-black">
      <Text className="text-center text-2xl text-white">Loading...</Text>
      <ActivityIndicator size="large" color="white" />
      <Redirect href={'/(root)'} />
    </View>
  );
}
