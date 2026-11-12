import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
        Alert.alert(
            "Permission required",
            "Allow access to your photo library to choose an image."
        );
        return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
    });

    if (result.canceled) {
        return null;
    }

    return result.assets[0];
}
