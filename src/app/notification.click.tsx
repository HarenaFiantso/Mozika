import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

import { Redirect } from 'expo-router';

export default function NotificationClick() {
  return (
    <View className="flex-1 bg-black justify-center items-center gap-10">
      <Text className="text-center text-white text-2xl">Loading...</Text>
      <ActivityIndicator size="large" color="white" />
      <Redirect href={'/(root)'} />
    </View>
  );
}
