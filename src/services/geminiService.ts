import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const apiKey = process.env.API_KEY || ""; // Ensure API key is present
const ai = new GoogleGenAI({ apiKey });

export const generateQuizQuestion = async (
  topic: string,
  difficulty: string
): Promise<QuizQuestion> => {
  if (!apiKey) {
    // Fallback for demo if no key provided
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          question:
            "What is the primary function of a miner in a Proof of Work blockchain (Demo Mode)?",
          options: [
            "To store all the data",
            "To validate transactions and secure the network",
            "To issue new tokens to developers",
            "To create the graphical interface",
          ],
          correctIndex: 1,
          explanation:
            "Miners use computational power to solve complex mathematical puzzles, validating transactions and adding new blocks to the chain.",
          topic: topic,
        });
      }, 1000);
    });
  }

  try {
    const prompt = `Create a single multiple-choice question about "${topic}" in the context of Blockchain technology. Difficulty level: ${difficulty}.
    The question should be engaging. Provide 4 options, the index of the correct option (0-3), and a short educational explanation.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            correctIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            topic: { type: Type.STRING }, // Echo back the topic or a sub-topic
          },
          required: ["question", "options", "correctIndex", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as QuizQuestion;
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback error question
    return {
      question: "The network is congested (API Error). What is a 'Fork'?",
      options: [
        "A split in the blockchain",
        "A spoon",
        "A password",
        "A wallet",
      ],
      correctIndex: 0,
      explanation:
        "A fork happens when a blockchain splits into two potential paths forward.",
      topic: topic,
    };
  }
};
