import {
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

type ChatInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    onSend: () => void;
    disabled?: boolean;
};

export default function ChatInput({
    value,
    onChangeText,
    onSend,
    disabled = false,
}: ChatInputProps) {
    return (
        <View className="flex-row items-end border-t border-gray-200 bg-white px-4 py-3">
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Ask about this disease..."
                placeholderTextColor="#9CA3AF"
                multiline
                editable={!disabled}
                className="max-h-28 flex-1 rounded-2xl bg-gray-100 px-4 py-3 text-base text-gray-900"
            />

            <Pressable
                onPress={onSend}
                disabled={disabled || !value.trim()}
                className={`ml-2 h-12 w-12 items-center justify-center rounded-full ${
                    disabled || !value.trim()
                        ? "bg-gray-300"
                        : "bg-green-700"
                }`}
            >
                <Text className="text-lg font-bold text-white">
                    ↑
                </Text>
            </Pressable>
        </View>
    );
}