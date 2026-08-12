import { Image, View } from "react-native";

interface ImagePreviewProps {
    uri: string;
}

export default function ImagePreview({
    uri,
}: ImagePreviewProps) {
    return (
        <View className="h-[400px] w-full overflow-hidden rounded-3xl bg-gray-100">
            <Image
                source={{ uri }}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                resizeMode="contain"
            />
        </View>
    );
}