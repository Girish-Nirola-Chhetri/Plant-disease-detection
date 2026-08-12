import { router } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import UploadButtons from "@/components/home/UploadButton";
import { pickImage } from "@/services/image/picker";

export default function HomeScreen() {
    const handleGalleryPress = async () => {
        const image = await pickImage();

        if (!image) {
            return;
        }

        router.push({
            pathname: "./preview",
            params: {
                uri: image.uri,
            },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F7FBF6]">
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 20,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Header />
                <Hero />

                <UploadButtons
                    onCameraPress={() =>
                        router.push({
                        pathname: "./camera",
                        })
                    }
                    onGalleryPress={handleGalleryPress}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
