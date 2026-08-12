import { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text,View, } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { predictDisease } from "@/services/inference/predictor";


export default function LoadingScreen() {

    const { uri } = useLocalSearchParams<{
        uri: string;
    }>();

    useEffect(() => {
        if (!uri) {
            return;
        }

        const handleAnalyze = async () => {
            try {
                console.log("Starting prediction...");

                const prediction = await predictDisease(uri);

                console.log("Prediction:", prediction);

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
            }
        };

        handleAnalyze();
    }, [uri]);

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