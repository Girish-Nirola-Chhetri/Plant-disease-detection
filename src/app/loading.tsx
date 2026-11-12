import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Button from "@/components/ui/Button";
import { predictDisease } from "@/services/inference/predictor";

export default function LoadingScreen() {
    const { uri } = useLocalSearchParams<{
        uri: string;
    }>();

    const [failed, setFailed] = useState(false);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!uri) {
            return;
        }

        let cancelled = false;

        const handleAnalyze = async () => {
            try {
                const prediction = await predictDisease(uri);

                if (cancelled) {
                    return;
                }

                router.replace({
                    pathname: "/result",
                    params: {
                        crop: prediction.crop,
                        disease: prediction.disease,
                        slug: prediction.slug,
                        uri,
                    },
                });
            } catch (error) {
                console.error("Prediction failed:", error);

                if (!cancelled) {
                    setFailed(true);
                }
            }
        };

        setFailed(false);
        handleAnalyze();

        return () => {
            cancelled = true;
        };
    }, [uri, attempt]);

    if (failed || !uri) {
        return (
            <SafeAreaView className="flex-1 bg-[#F7FBF6]">
                <View className="flex-1 items-center justify-center px-6">
                    <Text className="text-2xl font-bold text-gray-900">
                        Couldn't analyze the image
                    </Text>

                    <Text className="mt-3 text-center text-base leading-6 text-gray-500">
                        Something went wrong while analyzing your photo.
                        Try again, or choose a different image.
                    </Text>

                    <View className="mt-8 w-full gap-3">
                        {uri ? (
                            <Button
                                title="Try Again"
                                onPress={() => setAttempt((value) => value + 1)}
                            />
                        ) : null}

                        <Button
                            title="Go Back"
                            variant="secondary"
                            onPress={() => router.back()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F7FBF6]">
            <View className="flex-1 items-center justify-center px-6">

                <View className="h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <ActivityIndicator
                        size="large"
                        color="#2E7D32"
                    />
                </View>

                <Text className="mt-8 text-2xl font-bold text-gray-900">
                    Analyzing Image
                </Text>

                <Text className="mt-3 text-center text-base leading-6 text-gray-500">
                    We're analyzing your plant image.
                    {"\n"}
                    This may take a few seconds.
                </Text>

            </View>
        </SafeAreaView>
    );
}
