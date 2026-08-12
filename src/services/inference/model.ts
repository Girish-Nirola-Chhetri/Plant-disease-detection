import * as ort from "onnxruntime-react-native";
import { Asset } from "expo-asset";

let session: ort.InferenceSession | null = null;

export async function loadModel() {
    if (session) {
        return session;
    }

    console.log("Loading ONNX model...");

    const modelAsset = Asset.fromModule(
        require("../../assets/models/plant_disease.onnx")
    );

    await modelAsset.downloadAsync();

    if (!modelAsset.localUri) {
        throw new Error("Failed to get local URI for ONNX model");
    }

    console.log("Model path:", modelAsset.localUri);

    session = await ort.InferenceSession.create(
        modelAsset.localUri
    );

    console.log("ONNX model loaded");
    console.log("Input names:", session.inputNames);
    console.log("Output names:", session.outputNames);

    return session;
}