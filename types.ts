export interface Ingredient {
  id: string;
  name: string;
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  MASTER_CHEF = 'Master Chef',
  RANDOM = 'Random'
}

export enum Cuisine {
  ITALIAN = 'Italian',
  FRENCH = 'French',
  CHINESE = 'Chinese',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean',
  INDIAN = 'Indian',
  MEXICAN = 'Mexican',
  AMERICAN = 'American',
  THAI = 'Thai',
  MEDITERRANEAN = 'Mediterranean',
  ANY = 'Any'
}

export interface RecipePreferences {
  ingredients: string;
  cuisine: string;
  difficulty: string;
  time: string;
  numDishes: number;
  portionSize: string;
  occasion: string;
  mealType: string;
  dietaryRestrictions: string[];
  appliance: string;
}

export interface Recipe {
  title: string;
  description: string;
  cookingTime: string;
  difficulty: string;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  tips: string;
  videoSearchQuery: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface RecipeHistoryItem {
  id: string;
  timestamp: number;
  recipes: Recipe[];
  summaryTitle: string; // The title of the first recipe to show in the list
}

export type ImageSize = '1K' | '2K' | '4K';

export type Language = 'en' | 'zh-TW' | 'zh-CN' | 'ko';