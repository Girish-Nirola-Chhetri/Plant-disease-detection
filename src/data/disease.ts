export type DiseaseInfo = {
    crop: string;
    disease: string;
    description: string;
    symptoms: string[];
    treatment: string[];
    prevention: string[];
    isHealthy: boolean;
};

export const DISEASES: Record<string, DiseaseInfo> = {
    "tomato-early-blight": {
        crop: "Tomato",
        disease: "Early Blight",
        description:
            "A fungal disease that affects tomato plants.",
        symptoms: [
            "Dark spots may appear on older leaves.",
            "Spots may develop concentric rings.",
            "Affected leaves may yellow and fall.",
        ],
        treatment: [
            "Remove severely affected leaves.",
            "Avoid wetting the foliage when watering.",
            "Use an appropriate fungicide according to its label.",
        ],
        prevention: [
            "Maintain good air circulation.",
            "Water at the base of the plant.",
            "Remove infected plant debris.",
            "Practice crop rotation where possible.",
        ],
        isHealthy: false,
    },

    "tomato-healthy": {
        crop: "Tomato",
        disease: "Healthy",
        description:
            "No disease was detected in the provided image.",
        symptoms: [],
        treatment: [],
        prevention: [
            "Continue regular monitoring.",
            "Maintain good watering and nutrition practices.",
            "Keep the growing area clean.",
        ],
        isHealthy: true,
    },
};