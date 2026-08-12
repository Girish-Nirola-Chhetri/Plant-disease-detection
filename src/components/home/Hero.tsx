import { Text, View } from "react-native";

export default function Hero() {
    return (
        <View className="items-center mt-12 px-6">

            <View className="w-48 h-48 rounded-full bg-green-100 items-center justify-center">

                <Text className="text-8xl">
                    🌱
                </Text>

            </View>

            <Text className="text-2xl font-bold text-center mt-8">
                Detect Plant Diseases
            </Text>

            <Text className="text-gray-500 text-center mt-3 leading-6">
                Capture a leaf image and let AI identify diseases in seconds.
            </Text>

        </View>
    );
}