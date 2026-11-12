export type DiseaseContext = {
    description: string;
    symptoms: string[];
    treatment: string[];
    prevention: string[];
};

export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export type ChatRequest = {
    crop: string;
    disease: string;
    context: DiseaseContext;
    messages: ChatMessage[];
};

export type ChatResponse = {
    reply: string;
};

// Set EXPO_PUBLIC_API_URL in .env (see .env.example). On a real phone this must
// be your computer's LAN address (or a deployed HTTPS URL), not "localhost".
// Release builds on Android/iOS only allow HTTPS, so deploy the API behind TLS.
const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 30_000;

/** Error whose message is safe to show to the user. */
export class AIRequestError extends Error {
    constructor(
        message: string,
        public readonly status?: number
    ) {
        super(message);
        this.name = "AIRequestError";
    }
}

async function readServerError(response: Response): Promise<string> {
    try {
        const data = (await response.json()) as { error?: unknown };
        if (typeof data.error === "string" && data.error.trim()) {
            return data.error;
        }
    } catch {
        // Fall through to the generic messages below.
    }

    if (response.status === 429) {
        return "Too many questions in a short time. Please wait a minute and try again.";
    }

    return `The AI service returned an error (${response.status}).`;
}

export async function askAI(
    request: ChatRequest
): Promise<ChatResponse> {
    if (!API_URL) {
        throw new AIRequestError(
            "The AI service address is not configured. Set EXPO_PUBLIC_API_URL in the .env file."
        );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(`${API_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new AIRequestError(
                await readServerError(response),
                response.status
            );
        }

        const data = (await response.json()) as Partial<ChatResponse>;

        if (typeof data.reply !== "string" || !data.reply.trim()) {
            throw new AIRequestError(
                "The AI service returned an empty answer. Please try again."
            );
        }

        return { reply: data.reply };
    } catch (error) {
        if (error instanceof AIRequestError) {
            throw error;
        }

        if (error instanceof Error && error.name === "AbortError") {
            throw new AIRequestError(
                "The AI service took too long to respond. Please try again."
            );
        }

        throw new AIRequestError(
            "I couldn't reach the AI service. Check your connection and try again."
        );
    } finally {
        clearTimeout(timeout);
    }
}
