import * as ort from "onnxruntime-react-native";
import { Asset } from "expo-asset";

let sessionPromise: Promise<ort.InferenceSession> | null = null;

async function createSession(): Promise<ort.InferenceSession> {
    const modelAsset = Asset.fromModule(
        require("../../assets/models/plant_disease.onnx")
    );

    await modelAsset.downloadAsync();

    if (!modelAsset.localUri) {
        throw new Error("Failed to get local URI for ONNX model");
    }

    return ort.InferenceSession.create(modelAsset.localUri);
}

/**
 * Loads the model once. The promise is cached, so two callers at the same time
 * share one session instead of each creating their own; a failed load is
 * forgotten so the next call can retry.
 */
export function loadModel(): Promise<ort.InferenceSession> {
    if (!sessionPromise) {
        sessionPromise = createSession().catch((error) => {
            sessionPromise = null;
            throw error;
        });
    }

    return sessionPromise;
}
