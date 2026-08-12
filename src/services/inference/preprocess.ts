import * as ImageManipulator from "expo-image-manipulator";
import { File } from "expo-file-system";
import jpeg from "jpeg-js";

const IMAGE_SIZE = 224;

const MEAN = [0.485, 0.456, 0.406];
const STD = [0.229, 0.224, 0.225];

export async function preprocessImage(uri: string): Promise<Float32Array> {
    // 1. Resize image to 224 × 224
    const result = await ImageManipulator.manipulateAsync(
        uri,
        [
            {
                resize: {
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                },
            },
        ],
        {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
        }
    );

    // 2. Read the resized JPEG as bytes
    const file = new File(result.uri);
    const bytes = await file.bytes();

    // 3. Decode JPEG → RGBA pixels
    const decoded = jpeg.decode(bytes, {
        useTArray: true,
    });

    const pixelCount = IMAGE_SIZE * IMAGE_SIZE;

    // ONNX input shape:
    // [1, 3, 224, 224]
    const tensor = new Float32Array(
        3 * pixelCount
    );

    for (let i = 0; i < pixelCount; i++) {
        const pixelIndex = i * 4;

        const r = decoded.data[pixelIndex];
        const g = decoded.data[pixelIndex + 1];
        const b = decoded.data[pixelIndex + 2];

        // ToTensor(): [0, 255] → [0, 1]
        const rValue = r / 255;
        const gValue = g / 255;
        const bValue = b / 255;

        // ImageNet normalization
        const rNormalized =
            (rValue - MEAN[0]) / STD[0];

        const gNormalized =
            (gValue - MEAN[1]) / STD[1];

        const bNormalized =
            (bValue - MEAN[2]) / STD[2];

        // CHW layout
        tensor[i] = rNormalized;

        tensor[pixelCount + i] = gNormalized;

        tensor[2 * pixelCount + i] = bNormalized;
    }

    return tensor;
}