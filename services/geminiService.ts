import { GoogleGenAI, Type, Chat } from "@google/genai";
import { Recipe, ImageSize, Language, RecipePreferences } from "../types";

// Helper to get the AI client. 
// We create a new instance each time to ensure we pick up the latest API key 
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in process.env");
  }
  return new GoogleGenAI({ apiKey: apiKey });
};

export const generateRecipe = async (
  prefs: RecipePreferences,
  lang: Language
): Promise<Recipe[]> => {
  const ai = getAiClient();
  
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
    
    IMPORTANT INSTRUCTION ON INGREDIENTS:
    - The "Ingredients available" list contains what the user has in their kitchen.
    - You do NOT need to use every single ingredient listed. 
    - Select the best combination of the provided ingredients to create a coherent and delicious dish.
    - You may assume the user has basic pantry staples (oil, salt, pepper, soy sauce, sugar, water, etc.) even if not listed.
    
    IMPORTANT INSTRUCTION ON CONSTRAINTS:
    - If a specific appliance is selected (e.g., Air Fryer), ensure the recipe primarily uses that tool.
    - Strictly adhere to dietary restrictions (e.g., if Vegan, do not use meat, eggs, or dairy).
    - If a specific meal type is selected (e.g. Breakfast), ensure the recipe is appropriate for that meal.
    
    ${langInstruction}

    Return a JSON array of objects, where each object represents a recipe with the following fields:
    - title (string): Creative name of the dish
    - description (string): A short, appetizing description (max 2 sentences)
    - cookingTime (string): Estimated time (e.g. "30 mins")
    - difficulty (string): The difficulty level
    - cuisine (string): The cuisine type
    - ingredients (array of strings): List of ingredients with quantities adjusted for the portion size
    - instructions (array of strings): Step-by-step cooking instructions including temperature and mode for specific appliances
    - tips (string): One or two pro tips for this dish
    - videoSearchQuery (string): A search query string optimized for finding a YouTube video tutorial for this specific dish (e.g. 'How to make authentic Mapo Tofu' or '麻婆豆腐做法').
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            cookingTime: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            cuisine: { type: Type.STRING },
            ingredients: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            instructions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            tips: { type: Type.STRING },
            videoSearchQuery: { type: Type.STRING },
          },
          required: ["title", "description", "ingredients", "instructions", "videoSearchQuery"],
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as Recipe[];
};

export const generateDishImage = async (
  recipeTitle: string,
  description: string,
  size: ImageSize
): Promise<string> => {
  const ai = getAiClient();
  
  // Using gemini-2.5-flash-image (Nano/Flash) for faster, automatic generation
  const prompt = `Professional food photography of ${recipeTitle}. ${description}. 
  High resolution, delicious, soft lighting, michelin star plating, photorealistic, 8k.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      }
    }
  });

  // Extract image
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image generated");
};

// Chat instance storage
let chatSession: Chat | null = null;
let currentChatLang: Language = 'en';

export const sendMessageToChef = async (message: string, lang: Language, history: any[] = []): Promise<string> => {
  const ai = getAiClient();
  
  // Re-initialize chat if language changes or it doesn't exist
  if (!chatSession || currentChatLang !== lang) {
    currentChatLang = lang;
    
    let systemInstruction = "You are a world-class chef named Chef Gemini. You are helpful, encouraging, and knowledgeable about all cuisines. Keep answers concise but friendly.";
    
    if (lang === 'zh-TW') {
      systemInstruction = "你是一位名叫 Gemini 大厨的世界级厨师。你乐于助人、充满鼓励，并且对所有菜系都非常了解。请用繁体中文回答，保持简洁友好的语气。";
    } else if (lang === 'zh-CN') {
      systemInstruction = "你是一位名叫 Gemini 大厨的世界级厨师。你乐于助人、充满鼓励，并且对所有菜系都非常了解。请用简体中文回答，保持简洁友好的语气。";
    } else if (lang === 'ko') {
      systemInstruction = "당신은 셰프 Gemini라는 세계적인 요리사입니다. 당신은 도움이 되고, 격려를 아끼지 않으며, 모든 요리에 대해 잘 알고 있습니다. 한국어로 대답하고 간결하지만 친근한 어조를 유지하세요.";
    }

    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: systemInstruction
      },
      history: history 
    });
  }

  const result = await chatSession.sendMessage({ message });
  return result.text || "I'm sorry, I didn't catch that.";
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