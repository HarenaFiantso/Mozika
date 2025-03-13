import { Image, Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton } from '@/components/core';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#40C2D5]">
      <View className="h-2/3 w-full items-center justify-center">
        <Image source={require('assets/images/girl.png')} />
      </View>
      <View className="absolute bottom-0 left-0 right-0 h-2/4 items-center justify-center gap-10 rounded-t-[4rem] bg-[#121111] p-8">
        <Text className="text-center text-3xl font-bold tracking-wide text-white">
          From the <Text className="text-[#76D7E6]">latest</Text> to the{' '}
          <Text className="text-[#76D7E6]">greatest</Text> hits, play your favorite tracks on{' '}
          <Text className="text-[#76D7E6]">Mozika</Text> now!
        </Text>
        <View className="h-2 w-10 rounded-3xl bg-white" />
        <CustomButton
          handleSubmit={() => router.push('/whoami')}
          title="Get Started"
          additionalStyles="bg-[#06A0B5] shadow-custom-cyan py-5 rounded-[4rem]"
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
