import type { DiseasePrediction } from "./types"

export function standardizePrediction(
    rawLabel: string
): DiseasePrediction {
    const parts = rawLabel.split("___");

    if (parts.length !== 2) {
        throw new Error(
            `Invalid disease label: ${rawLabel}`
        );
    }

    const rawCrop = parts[0];
    const rawDisease = parts[1];

    const crop = rawCrop
        .replace(/_/g, " ")
        .trim();

    const disease = rawDisease
        .replace(/_/g, " ")
        .trim();

    const slug = `${crop}-${disease}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    return {
        crop,
        disease,
        slug,
    };
}