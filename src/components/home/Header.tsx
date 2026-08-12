import { Text, View } from "react-native";

export default function Header() {
    return (
        <View className="items-center mt-10">
            <Text className="text-5xl">
                🌿
            </Text>

            <Text className="text-3xl font-bold text-gray-900 mt-4">
                PlantAI
            </Text>

            <Text className="text-gray-500 text-center mt-2 px-8">
                AI Powered Plant Disease Detection
            </Text>
        </View>
    );
}