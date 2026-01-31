import { GoogleGenAI } from "@google/genai";

export const summarizeArticle = async (title, content) => {
    // Always create a new GoogleGenAI instance right before the call to ensure the latest API key is used
    // The API key must be obtained exclusively from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Please provide a concise 2-sentence summary of the following news article: 
      Title: ${title}
      Context: ${content}`,
            config: {
                temperature: 0.7,
                // Avoiding maxOutputTokens unless necessary to prevent blocking the response
            }
        });

        // The .text property directly returns the string output from the response
        return response.text;
    } catch (error) {
        console.error("Gemini Summarization Error:", error);
        return "Could not generate summary at this time.";
    }
};
