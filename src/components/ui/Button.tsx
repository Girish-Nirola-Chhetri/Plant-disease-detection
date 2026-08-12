import React from "react";
import {
    Pressable,
    Text,
    ActivityIndicator,
    View,
} from "react-native";

import { COLORS } from "@/constants/colors";

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export default function Button({
    title,
    onPress,
    variant = "primary",
    loading = false,
    disabled = false,
    icon,
}: ButtonProps) {
    const isPrimary = variant === "primary";

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className={`
                h-14
                w-full
                rounded-2xl
                items-center
                justify-center
                ${isPrimary ? "bg-green-700" : "bg-white border-2 border-green-700"}
                ${disabled ? "opacity-60" : ""}
            `}
        >
            {loading ? (
                <ActivityIndicator
                    color={isPrimary ? "#FFFFFF" : COLORS.primary}
                />
            ) : (
                <View className="flex-row items-center gap-2">
                    {icon}

                    <Text
                        className={`
                            text-base
                            font-semibold
                            ${isPrimary ? "text-white" : "text-green-700"}
                        `}
                    >
                        {title}
                    </Text>
                </View>
            )}
        </Pressable>
    );
}