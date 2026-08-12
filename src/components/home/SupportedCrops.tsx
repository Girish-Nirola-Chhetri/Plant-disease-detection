import { Text, View } from "react-native";

const crops = [
    "Tomato",
    "Potato",
    "Chilli",
    "Maize",
    "Banana",
    "Mango",
    "Rice",
    "Onion",
];

export default function SupportedCrops() {
    return (
        <View className="mt-14">

            <Text className="text-lg font-semibold text-gray-900 mb-5">
                Supported Crops
            </Text>

            <View className="flex-row flex-wrap gap-3">

                {crops.map((crop) => (
                    <View
                        key={crop}
                        className="px-5 py-3 bg-white rounded-full border border-gray-200"
                    >
                        <Text className="text-gray-700 font-medium">
                            {crop}
                        </Text>
                    </View>
                ))}

            </View>

        </View>
    );
}