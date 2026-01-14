import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Recipe, ImageSize, Language, RecipePreferences } from "../types";

// Helper to get the AI client.
const getAiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' && process.env.VITE_GEMINI_API_KEY);

  if (!apiKey) {
    throw new Error("API Key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
  }
  return new GoogleGenerativeAI(apiKey);
};

export const ensureApiKey = async (): Promise<boolean> => {
  const win = window as any;
  if (win.aistudio && win.aistudio.hasSelectedApiKey) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      try {
        await win.aistudio.openSelectKey();
        return await win.aistudio.hasSelectedApiKey();
      } catch (e) {
        console.error("Failed to select key", e);
        return false;
      }
    }
    return true;
  }
  return true;
};

export const generateRecipe = async (
  prefs: RecipePreferences,
  lang: Language
): Promise<Recipe[]> => {
  const genAI = getAiClient();
  const model = genAI.getGenerativeModel({
    model: 'gemini-3-flash',
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            title: { type: SchemaType.STRING },
            description: { type: SchemaType.STRING },
            cookingTime: { type: SchemaType.STRING },
            difficulty: { type: SchemaType.STRING },
            cuisine: { type: SchemaType.STRING },
            ingredients: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING }
            },
            instructions: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING }
            },
            tips: { type: SchemaType.STRING },
            videoSearchQuery: { type: SchemaType.STRING },
          },
          required: ["title", "description", "ingredients", "instructions", "videoSearchQuery"],
        }
      }
    }
  });

  let langInstruction = "Output the response in English.";
  if (lang === 'zh-TW') {
    langInstruction = "Output the entire response in Traditional Chinese (Taiwan).";
  } else if (lang === 'zh-CN') {
    langInstruction = "Output the entire response in Simplified Chinese (Mainland China).";
  } else if (lang === 'ko') {
    langInstruction = "Output the entire response in Korean.";
  }

  const dietString = prefs.dietaryRestrictions.length > 0 ? prefs.dietaryRestrictions.join(', ') : 'None';
  const applianceString = prefs.appliance === 'any' ? 'Any standard kitchen tools' : prefs.appliance;
  const mealTypeString = prefs.mealType === 'any' ? 'Appropriate for any time' : prefs.mealType;

  const prompt = `
    Create ${prefs.numDishes} distinct and detailed cooking recipe(s) based on these parameters:
    1. Ingredients available: ${prefs.ingredients}
    2. Cuisine style: ${prefs.cuisine}
    3. Difficulty level: ${prefs.difficulty}
    4. Preferred cooking time: ${prefs.time || 'As needed'}
    5. Portion Size: ${prefs.portionSize}
    6. Occasion/Purpose: ${prefs.occasion}
    7. Meal Type: ${mealTypeString}
    8. Dietary Restrictions/Allergies: ${dietString}
    9. Preferred Cooking Method/Appliance: ${applianceString}
    
    ${langInstruction}
    Return exactly matching JSON format.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return JSON.parse(text) as Recipe[];
};

export const generateDishImage = async (
  recipeTitle: string,
  description: string,
  _size: ImageSize
): Promise<string> => {
  // Simple check for now as Imagen isn't always available on all keys
  throw new Error("Local image generation template not fully configured. Use public images for now.");
};

let chatSession: any = null;
let currentChatLang: Language = 'en';

export const sendMessageToChef = async (message: string, lang: Language, history: any[] = []): Promise<string> => {
  const genAI = getAiClient();

  if (!chatSession || currentChatLang !== lang) {
    currentChatLang = lang;
    let systemInstruction = "You are a world-class chef named Chef Gemini. Keep answers concise but friendly.";

    if (lang === 'zh-TW') systemInstruction = "你是一位名叫 Gemini 大廚的世界級廚師。請用繁體中文回答。";

    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash',
      systemInstruction: systemInstruction
    });

    chatSession = model.startChat({
      history: history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.message }] }))
    });
  }

  const result = await chatSession.sendMessage(message);
  return result.response.text();
};
