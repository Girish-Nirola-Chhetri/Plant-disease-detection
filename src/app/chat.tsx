import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatList, {
    type ChatMessage,
} from "@/components/chat/ChatList";
import ChatInput from "@/components/chat/ChatInput";

import {
    askAI,
    type ChatMessage as APIChatMessage,
} from "@/services/ai/chat";

export default function ChatScreen() {
    const { crop, disease } = useLocalSearchParams<{
        crop: string;
        disease: string;
    }>();

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            message: `I can help you understand ${disease} in ${crop}. What would you like to know?`,
            isUser: false,
        },
    ]);

    const handleSend = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || isLoading) {
            return;
        }

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            message: trimmedMessage,
            isUser: true,
        };

        /*
         * Build the conversation before updating state.
         * This guarantees that the latest user message
         * is included in the API request.
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

        setMessages((current) => [
            ...current,
            userMessage,
        ]);

        setMessage("");
        setIsLoading(true);

        try {
            const response = await askAI({
                crop,
                disease,

                /*
                 * We will connect the local disease
                 * dataset here later.
                 */
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
            console.error(
                "AI request failed:",
                error
            );

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F7FBF6]">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >
                <ChatHeader
                    crop={crop}
                    disease={disease}
                />

                <View className="flex-1">
                    <ChatList
                        messages={messages}
                    />
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