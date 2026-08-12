import { FlatList } from "react-native";

import MessageBubble from "./MessageBubble";

export type ChatMessage = {
    id: string;
    message: string;
    isUser: boolean;
};

type ChatListProps = {
    messages: ChatMessage[];
};

export default function ChatList({
    messages,
}: ChatListProps) {
    return (
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <MessageBubble
                    message={item.message}
                    isUser={item.isUser}
                />
            )}
            contentContainerClassName="px-4 py-5"
            showsVerticalScrollIndicator={false}
        />
    );
}