import { Text, View } from "react-native";

type ChatHeaderProps = {
    disease: string;
    crop: string;
};

export default function ChatHeader({
    disease,
    crop,
}: ChatHeaderProps) {
    return (
        <View className="border-b border-gray-200 bg-[#F7FBF6] px-5 py-4">
            <Text className="text-xl font-bold text-gray-900">
                Ask AI
            </Text>

            <Text className="mt-1 text-sm text-gray-500">
                {crop} · {disease}
            </Text>
        </View>
    );
}