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

const API_URL = "http://10.28.24.246:3000";

export async function askAI(
    request: ChatRequest
): Promise<ChatResponse> {
    const response = await fetch(
        `${API_URL}/api/chat`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        console.error(
            "AI API error:",
            response.status,
            errorText
        );

        throw new Error(
            `AI request failed: ${response.status}`
        );
    }

    return response.json();
}