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

const API_URL = "http://YOUR_PC_IP:3000";

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
        throw new Error(
            `AI request failed: ${response.status}`
        );
    }

    return response.json();
}