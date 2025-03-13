import { Image, Text, TextInput, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/stores';

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
  const { name, setName } = useUserStore();

  const handleSubmit = () => {
    console.log('User name:', name);
    alert(`Hello, ${name}!`);
  }

  return (
    <View className="flex-1 items-center justify-center bg-[#000000]">
      <View className="px-5 absolute top-20 left-0 z-[999]">
        <BackButton onPress={navigation.goBack} />
      </View>
      <SafeAreaView className="flex-1 w-full justify-center items-center gap-5">
        <Image source={require('assets/images/icon.png')} className="w-[15rem] h-[15rem]" />
        <Text className="text-white font-bold text-4xl">Who you are?</Text>
        <View
          className="w-[90%] h-16 px-4 bg-[#1E1E2D] rounded-2xl border-2 border-gray-500 flex flex-row items-center">
          <TextInput
            className="flex-1 text-white font-bold text-base"
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
