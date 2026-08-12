import { Text, View } from "react-native";

type MessageBubbleProps = {
    message: string;
    isUser: boolean;
};

export default function MessageBubble({
    message,
    isUser,
}: MessageBubbleProps) {
    return (
        <View
            className={`mb-3 max-w-[85%] rounded-2xl px-4 py-3 ${
                isUser
                    ? "self-end bg-green-700"
                    : "self-start bg-gray-100"
            }`}
        >
            <Text
                className={`text-base leading-6 ${
                    isUser
                        ? "text-white"
                        : "text-gray-800"
                }`}
            >
                {message}
            </Text>
        </View>
    );
}