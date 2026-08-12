import { View } from "react-native";

import Button from "@/components/ui/Button";

interface UploadButtonsProps {
    onCameraPress: () => void;
    onGalleryPress: () => void;
}

export default function UploadButtons({
    onCameraPress,
    onGalleryPress,
}: UploadButtonsProps) {
    return (
        <View className="mt-12 gap-4">

            <Button
                title="Capture Image"
                onPress={onCameraPress}
            />

            <Button
                title="Select From Gallery"
                variant="secondary"
                onPress={onGalleryPress}
            />

        </View>
    );
}