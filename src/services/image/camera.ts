import { Camera } from "expo-camera";

export async function captureImage() {
    const permission = await Camera.requestCameraPermissionsAsync();
    if( !permission.granted ) {
        return null;
    }

    return permission;
}