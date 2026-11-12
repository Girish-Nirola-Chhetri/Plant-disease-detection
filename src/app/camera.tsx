import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

import Button from "@/components/ui/Button";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const hasRequested = useRef(false);
    const isCapturing = useRef(false);

    // Ask once automatically; after that the user can use the button below.
    useEffect(() => {
        if (permission && !permission.granted && !hasRequested.current) {
            hasRequested.current = true;
            requestPermission();
        }
    }, [permission, requestPermission]);

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView className="flex-1 bg-[#F7FBF6]">
                <View className="flex-1 items-center justify-center px-6">
                    <Text className="text-2xl font-bold text-gray-900">
                        Camera access needed
                    </Text>

                    <Text className="mt-3 text-center text-base leading-6 text-gray-500">
                        Allow camera access to take a photo of your plant leaf.
                        You can also enable it in your phone's settings.
                    </Text>

                    <View className="mt-8 w-full gap-3">
                        <Button
                            title="Allow Camera"
                            onPress={() => requestPermission()}
                        />

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

    const handleTakePhoto = async () => {
        // Ignore extra taps while a photo is already being taken.
        if (!cameraRef.current || isCapturing.current) {
            return;
        }

        isCapturing.current = true;

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
            });

            if (!photo?.uri) {
                return;
            }

            router.push({
                pathname: "./preview",
                params: {
                    uri: photo.uri,
                },
            });
        } catch (error) {
            console.error("Failed to take photo:", error);
        } finally {
            isCapturing.current = false;
        }
    };

    return (
        <View className="flex-1 bg-black">
            <CameraView
                ref={cameraRef}
                facing="back"
                className="flex-1"
            />

            <SafeAreaView className="absolute bottom-0 left-0 right-0">
                <View className="items-center pb-8">
                    <Pressable
                        onPress={handleTakePhoto}
                        className="h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white"
                    >
                        <View className="h-16 w-16 rounded-full bg-green-700" />
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}
