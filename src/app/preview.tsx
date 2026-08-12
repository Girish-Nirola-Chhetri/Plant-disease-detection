import { router, useLocalSearchParams } from "expo-router";
import {
    SafeAreaView,
    Text,
    View,
} from "react-native";

import Button from "@/components/ui/Button";
import ImagePreview from "@/components/image/ImagePreview";

export default function PreviewScreen() {
    const { uri } = useLocalSearchParams<{ uri: string }>();


    if (!uri) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-[#F7FBF6]">
                <Text className="text-red-500">
                    No image selected
                </Text>
            </SafeAreaView>
        );
    }




    return (
        <SafeAreaView className="flex-1 bg-[#F7FBF6]">
            <View className="flex-1 px-6 py-6">

                <Text className="text-2xl font-bold text-gray-900">
                    Preview
                </Text>

                <Text className="mt-2 text-gray-500">
                    Make sure your plant leaf is clearly visible.
                </Text>

                <View className="mt-8">
                    <ImagePreview uri={uri} />
                </View>

                <View className="mt-6 gap-3">
                    <Button
                        title="Analyze Image"
                        onPress={() => {
                            router.push({
                                pathname: "./loading",
                                params: {
                                    uri,
                                },
                            });
                        }}
                    />

                    <Button
                        title="Choose Another Image"
                        variant="secondary"
                        onPress={() => router.back()}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
}