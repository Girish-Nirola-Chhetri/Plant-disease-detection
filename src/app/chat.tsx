import { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatList, {
    type ChatMessage,
} from "@/components/chat/ChatList";
import ChatInput from "@/components/chat/ChatInput";
import { askAI, type ChatMessage as APIChatMessage } from "@/services/ai/chat";

export default function ChatScreen() {
    const { crop, disease } = useLocalSearchParams<{
        crop: string;
        disease: string;
    }>();

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            message: `I can help you understand ${disease} in ${crop}. What would you like to know?`,
            isUser: false,
        },
    ]);

    const handleSend = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            message: trimmedMessage,
            isUser: true,
        };

        setMessages((current) => [
            ...current,
            userMessage,
        ]);

        setMessage("");

        try {
            /*
             * Convert the UI messages into the format
             * expected by the backend.
             */
            const conversation: APIChatMessage[] = [
                ...messages.map((item) => ({
                    role: item.isUser
                        ? ("user" as const)
                        : ("assistant" as const),
                    content: item.message,
                })),
                {
                    role: "user",
                    content: trimmedMessage,
                },
            ];

            const response = await askAI({
                crop,
                disease,
                context: {
                    description: "",
                    symptoms: [],
                    treatment: [],
                    prevention: [],
                },
                messages: conversation,
            });

            const aiMessage: ChatMessage = {
                id: `${Date.now()}-ai`,
                message: response.reply,
                isUser: false,
            };

            setMessages((current) => [
                ...current,
                aiMessage,
            ]);
        } catch (error) {
            console.error("AI request failed:", error);

            const errorMessage: ChatMessage = {
                id: `${Date.now()}-error`,
                message:
                    "I couldn't connect to the AI service. Please try again when you're online.",
                isUser: false,
            };

            setMessages((current) => [
                ...current,
                errorMessage,
            ]);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F7FBF6]">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }
            >
                <ChatHeader
                    crop={crop}
                    disease={disease}
                />

                <View className="flex-1">
                    <ChatList messages={messages} />
                </View>

                <ChatInput
                    value={message}
                    onChangeText={setMessage}
                    onSend={handleSend}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}