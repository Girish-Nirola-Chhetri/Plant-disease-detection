import { CameraView, useCameraPermissions } from 'expo-camera'
import { router } from 'expo-router';
import { useRef, useEffect} from 'react';
import { SafeAreaView, Text, Pressable, View } from 'react-native'


export default function CameraScreen() {

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null)

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    if( !permission ) {
        return null;
    }

    if( !permission ) {
        return null;
    }

    const handleTakePhoto = async () => {
        if( !cameraRef.current ) {
            return;
        }

        const photo = await cameraRef.current?.takePictureAsync({
            quality: 1
        });

        if( !photo?.uri) {
            return;
        }

        router.push({
            pathname: './preview',
            params: {
                uri: photo.uri
            }
        })
    }

    return (
        <View className='flex-1 bg-black'>
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
    )
}