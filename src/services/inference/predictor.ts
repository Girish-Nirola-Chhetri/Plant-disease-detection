import * as ort from "onnxruntime-react-native";

import { loadModel } from "./model";
import { preprocessImage } from "./preprocess";
import {getDiseaseLabel}  from "./labels";
import { standardizePrediction } from "./standardize-output"
import type { DiseasePrediction } from "./types";


export async function predictDisease( imageUri: string ): Promise<DiseasePrediction> {

    // 1. Load the ONNX model
    const session = await loadModel();

    // 2. Preprocess image
    const inputData = await preprocessImage(imageUri);

    // 3. Create ONNX tensor
    const inputTensor = new ort.Tensor(
        "float32",
        inputData,
        [1, 3, 224, 224]
    );

    // 4. Run inference (use the model's own input/output names)
    const inputName = session.inputNames[0];
    const outputName = session.outputNames[0];

    if (!inputName || !outputName) {
        throw new Error("ONNX model has no inputs or outputs");
    }

    const outputs = await session.run({
        [inputName]: inputTensor,
    });

    // 5. Get model output
    const output = outputs[outputName];

    if (!output) {
        throw new Error("ONNX model returned no output");
    }

    const scores = output.data as Float32Array;

    // 6. Find highest-scoring class

    let predictedIndex = 0;
    let highestScore = scores[0];

    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > highestScore) {
            highestScore = scores[i];
            predictedIndex = i;
        }
    }

    // Convert model index → raw disease label
    const rawLabel = getDiseaseLabel(predictedIndex);

    // Convert raw label → standardized prediction
    return standardizePrediction(rawLabel);


}