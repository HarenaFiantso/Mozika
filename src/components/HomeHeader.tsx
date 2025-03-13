import { Image, Text, View } from 'react-native';

import { useUserStore } from '@/stores';
import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';

export const HomeHeader = () => {
  const { name } = useUserStore();

  return (
    <View className="mt-5 w-full flex-row items-center gap-5 px-5">
      <View className="flex-1 flex-row gap-2">
        <Image
          source={require('assets/images/girl.png')}
          className="h-12 w-12 rounded-full border-2 border-cyan-500"
        />
        <View>
          <Text className="text-lg font-bold text-white">Welcome back !</Text>
          <Text className="text-white opacity-70">{name}</Text>
        </View>
      </View>
      <View className="w-full flex-1 flex-row justify-end gap-5">
        {/* TODO: Not implemented! Wrap into a touchableOpacity to make it clickable */}
        <MaterialIcons name="equalizer" size={20} color="white" />
        <Ionicons name="notifications" size={20} color="white" />
        <Fontisto name="player-settings" size={20} color="white" />
      </View>
    </View>
  );
};
