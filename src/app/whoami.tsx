import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { useUserStore } from '@/stores';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

function BackButton({ children, ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity className="self-start" {...rest}>
      <MaterialIcons name="arrow-back" color="white" size={35} />
      {children}
    </TouchableOpacity>
  );
}

export default function Whoami() {
  const navigation = useNavigation();
  const router = useRouter();
  const { name, setName } = useUserStore();

  const handleSubmit = () => {
    return router.push('/(root)');
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#000000]">
      <View className="absolute left-0 top-20 z-[999] px-5">
        <BackButton onPress={navigation.goBack} />
      </View>
      <SafeAreaView className="w-full flex-1 items-center justify-center gap-5">
        <Image source={require('assets/images/icon.png')} className="h-[15rem] w-[15rem]" />
        <Text className="text-4xl font-bold text-white">Who you are?</Text>
        <View className="flex h-16 w-[90%] flex-row items-center rounded-2xl border-2 border-gray-500 bg-[#1E1E2D] px-4">
          <TextInput
            className="flex-1 text-base font-bold text-white"
            placeholder="Write your name here"
            placeholderTextColor="#7B7B8B"
            value={name}
            onChangeText={setName}
          />
        </View>
        <TouchableOpacity
          className="w-[90%] rounded-[4rem] bg-[#06A0B5] py-5 shadow-custom-cyan"
          onPress={handleSubmit}
        >
          <Text className="text-center text-xl font-bold text-white">Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
