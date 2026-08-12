import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";

import { getDiseaseInfo } from "@/data/getDiseaseInfo";
import { isOnline } from "@/services/network/network";

export default function ResultScreen() {
    const { crop, disease, slug } = useLocalSearchParams<{
        crop: string;
        disease: string;
        slug: string;
        uri: string;
    }>();

    const [online, setOnline] = useState<boolean | null>(null);

    const diseaseInfo = slug
        ? getDiseaseInfo(slug)
        : null;

    useEffect(() => {
        const checkNetwork = async () => {
            const connected = await isOnline();

            setOnline(connected);
        };

        checkNetwork();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#F7FBF6]">
            <ScrollView
                className="flex-1"
                contentContainerClassName="px-6 py-8"
                showsVerticalScrollIndicator={false}
            >
                {/* Prediction */}
                <View className="items-center">
                    <Text className="text-sm font-medium text-gray-500">
                        Detected Crop
                    </Text>

                    <Text className="mt-1 text-3xl font-bold text-gray-900">
                        {crop}
                    </Text>

                    <Text className="mt-6 text-sm font-medium text-gray-500">
                        Detected Disease
                    </Text>

                    <Text className="mt-1 text-2xl font-bold text-green-700">
                        {disease}
                    </Text>
                </View>

                {/* Local disease information */}
                {diseaseInfo && (
                    <View className="mt-10">
                        {/* About */}
                        <View>
                            <Text className="text-xl font-bold text-gray-900">
                                About
                            </Text>

                            <Text className="mt-3 text-base leading-6 text-gray-600">
                                {diseaseInfo.description}
                            </Text>
                        </View>

                        {/* Symptoms */}
                        <View className="mt-8">
                            <Text className="text-xl font-bold text-gray-900">
                                Symptoms
                            </Text>

                            <View className="mt-3">
                                {diseaseInfo.symptoms.map(
                                    (symptom, index) => (
                                        <View
                                            key={index}
                                            className="mb-3 flex-row"
                                        >
                                            <Text className="mr-2 text-base text-green-700">
                                                •
                                            </Text>

                                            <Text className="flex-1 text-base leading-6 text-gray-600">
                                                {symptom}
                                            </Text>
                                        </View>
                                    )
                                )}
                            </View>
                        </View>

                        {/* Treatment */}
                        <View className="mt-8">
                            <Text className="text-xl font-bold text-gray-900">
                                Treatment
                            </Text>

                            <View className="mt-3">
                                {diseaseInfo.treatment.map(
                                    (item, index) => (
                                        <View
                                            key={index}
                                            className="mb-3 flex-row"
                                        >
                                            <Text className="mr-2 text-base text-green-700">
                                                •
                                            </Text>

                                            <Text className="flex-1 text-base leading-6 text-gray-600">
                                                {item}
                                            </Text>
                                        </View>
                                    )
                                )}
                            </View>
                        </View>

                        {/* Prevention */}
                        <View className="mt-8">
                            <Text className="text-xl font-bold text-gray-900">
                                Prevention
                            </Text>

                            <View className="mt-3">
                                {diseaseInfo.prevention.map(
                                    (item, index) => (
                                        <View
                                            key={index}
                                            className="mb-3 flex-row"
                                        >
                                            <Text className="mr-2 text-base text-green-700">
                                                •
                                            </Text>

                                            <Text className="flex-1 text-base leading-6 text-gray-600">
                                                {item}
                                            </Text>
                                        </View>
                                    )
                                )}
                            </View>
                        </View>
                    </View>
                )}

                {/* No local information */}
                {!diseaseInfo && (
                    <View className="mt-10">
                        <Text className="text-center text-base text-gray-500">
                            Detailed information for this disease is not
                            available offline yet.
                        </Text>
                    </View>
                )}

                {/* AI section */}
                {online === true && (
                    <View className="mt-10">
                        <View className="rounded-2xl bg-green-100 p-5">
                            <Text className="text-lg font-bold text-gray-900">
                                Want to know more?
                            </Text>

                            <Text className="mt-2 text-base leading-6 text-gray-600">
                                Ask AI questions about this disease,
                                treatment, or prevention.
                            </Text>


                            <Pressable
                                onPress={() => {
                                    router.push({
                                        pathname: "./chat",
                                        params: {
                                            crop,
                                            disease,
                                            slug,
                                        },
                                    });
                                }}
                                className="mt-4 rounded-xl bg-green-700 px-5 py-4"
                            >
                                <Text className="text-center font-semibold text-white">
                                    Ask AI
                                </Text>
                            </Pressable>

                            
                        </View>
                    </View>
                )}

                {/* Offline indicator */}
                {online === false && (
                    <View className="mt-10 rounded-2xl bg-gray-100 p-5">
                        <Text className="text-center text-sm text-gray-600">
                            You're offline. Disease information is
                            available without an internet connection.
                        </Text>
                    </View>
                )}

                {/* Checking network */}
                {online === null && (
                    <View className="mt-8 items-center">
                        <ActivityIndicator />
                    </View>
                )}

                
            </ScrollView>
        </SafeAreaView>
    );
}