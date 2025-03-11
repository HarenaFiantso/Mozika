import "@/global.css"
import {Text, View} from "react-native";

export default function RootLayout() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="underline text-2xl font-bold">Hello, this is the first test with Mozika</Text>
        </View>
    )
}
