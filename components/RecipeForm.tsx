import React, { useState } from 'react';
import { Cuisine, Difficulty, Language, RecipePreferences } from '../types';
import Button from './Button';
import { translations } from '../translations';

interface RecipeFormProps {
  onSubmit: (data: RecipePreferences) => void;
  isLoading: boolean;
  lang: Language;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, isLoading, lang }) => {
  const t = translations[lang];

  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState<string>(Cuisine.ANY);
  const [difficulty, setDifficulty] = useState<string>(Difficulty.MEDIUM);
  const [time, setTime] = useState('');
  const [numDishes, setNumDishes] = useState<number>(1);
  
  // New States
  const [portionSize, setPortionSize] = useState('2');
  const [occasion, setOccasion] = useState('daily');
  const [mealType, setMealType] = useState('any');
  const [appliance, setAppliance] = useState('any');
  const [dietary, setDietary] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;
    onSubmit({ 
      ingredients, 
      cuisine, 
      difficulty, 
      time, 
      numDishes,
      portionSize,
      occasion,
      mealType,
      dietaryRestrictions: dietary,
      appliance
    });
  };

  const addIngredient = (ing: string) => {
    if (ingredients.trim()) {
      setIngredients(prev => `${prev}, ${ing}`);
    } else {
      setIngredients(ing);
    }
  };

  const handleSurpriseMe = () => {
    const shuffled = [...t.commonIngredients].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setIngredients(selected.join(', '));
  };

  const toggleDietary = (key: string) => {
    setDietary(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-stone-100 relative z-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">
           {t.formTitle}
        </h2>
        <p className="text-stone-500">
           {t.formSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ingredients */}
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="ingredients-input" className="block text-sm font-semibold text-stone-700">
              {t.ingredientsLabel}
            </label>
            <button 
              type="button" 
              onClick={handleSurpriseMe}
              className="text-xs text-chef-600 hover:text-chef-700 font-medium flex items-center gap-1"
            >
              <i className="fas fa-magic"></i> {t.surpriseMeBtn}
            </button>
          </div>
          <textarea
            id="ingredients-input"
            name="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder={t.ingredientsPlaceholder}
            className="w-full p-4 rounded-xl border border-stone-200 focus:border-chef-500 focus:ring-2 focus:ring-chef-200 outline-none transition-all min-h-[100px] text-stone-700 placeholder-stone-400 bg-white"
            required
            disabled={isLoading}
            autoComplete="off"
          />
          <div className="mt-2 text-xs text-chef-600 flex items-start gap-1">
             <i className="fas fa-info-circle mt-0.5"></i>
             <span>{t.ingredientFlexibilityHint}</span>
          </div>
          
          {/* Quick Add Tags */}
          <div className="mt-3">
             <span className="text-xs text-stone-500 font-medium mr-2">{t.quickAddLabel}</span>
             <div className="flex flex-wrap gap-2 mt-1">
               {t.commonIngredients.map((ing) => (
                 <button
                   key={ing}
                   type="button"
                   onClick={() => addIngredient(ing)}
                   disabled={isLoading}
                   className="px-2 py-1 bg-stone-100 hover:bg-chef-50 text-stone-600 hover:text-chef-700 rounded-md text-xs transition-colors"
                 >
                   + {ing}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Row 1: Meal Type & Cuisine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              {t.mealTypeLabel}
            </label>
            <div className="relative">
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-chef-500 focus:ring-2 focus:ring-chef-200 outline-none transition-all bg-white appearance-none cursor-pointer"
                disabled={isLoading}
              >
                 {Object.keys(t.mealTypes).map((key) => (
                   <option key={key} value={key}>
                     {t.mealTypes[key as keyof typeof t.mealTypes]}
                   </option>
                 ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-chevron-down text-stone-400 text-xs"></i>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              {t.cuisineLabel}
            </label>
            <div className="relative">
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-chef-500 focus:ring-2 focus:ring-chef-200 outline-none transition-all bg-white appearance-none cursor-pointer"
                disabled={isLoading}
              >
                {Object.values(Cuisine).map((c) => (
                  <option key={c} value={c}>
                    {t.cuisines[c as keyof typeof t.cuisines] || c}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-chevron-down text-stone-400 text-xs"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* Row 2: Occasion & Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <label className="block text-sm font-semibold text-stone-700 mb-2">
              {t.occasionLabel}
            </label>
            <div className="relative">
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-chef-500 focus:ring-2 focus:ring-chef-200 outline-none transition-all bg-white appearance-none cursor-pointer"
                disabled={isLoading}
              >
                 {Object.keys(t.occasions).map((key) => (
                   <option key={key} value={key}>
                     {t.occasions[key as keyof typeof t.occasions]}
                   </option>
                 ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-chevron-down text-stone-400 text-xs"></i>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              {t.difficultyLabel}
            </label>
            <div className="relative">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-chef-500 focus:ring-2 focus:ring-chef-200 outline-none transition-all bg-white appearance-none cursor-pointer"
                disabled={isLoading}
              >
                 {Object.values(Difficulty).map((d) => (
                   <option key={d} value={d}>
                     {t.difficulties[d as keyof typeof t.difficulties] || d}
                   </option>
                 ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-chevron-down text-stone-400 text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Portion & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <label className="block text-sm font-semibold text-stone-700 mb-2">
              {t.portionLabel}
            </label>
            <div className="relative">
              <select
                value={portionSize}
                onChange={(e) => setPortionSize(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-chef-500 focus:ring-2 focus:ring-chef-200 outline-none transition-all bg-white appearance-none cursor-pointer"
                disabled={isLoading}
              >
                 {Object.keys(t.portions).map((key) => (
                   <option key={key} value={key}>
                     {t.portions[key as keyof typeof t.portions]}
                   </option>
                 ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-chevron-down text-stone-400 text-xs"></i>
              </div>
            </div>
          </div>
          
          <div>
             <label htmlFor="time-input" className="block text-sm font-semibold text-stone-700 mb-2">
              {t.timeLabel}
            </label>
             <input 
                id="time-input"
                type="text" 
                placeholder={t.timePlaceholder}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={isLoading}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-chef-500 focus:ring-2 focus:ring-chef-200 outline-none transition-all bg-white"
             />
          </div>
        </div>

        {/* Row 4: Num Dishes & Appliance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <label className="block text-sm font-semibold text-stone-700 mb-2">
              {t.numDishesLabel}
             </label>
             <div className="flex bg-stone-100 p-1 rounded-xl">
               {[1, 2, 3].map((num) => (
                 <button
                   key={num}
                   type="button"
                   onClick={() => setNumDishes(num)}
                   disabled={isLoading}
                   className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                     numDishes === num
                       ? 'bg-white text-chef-700 shadow-sm'
                       : 'text-stone-500 hover:text-stone-700'
                   }`}
                 >
                   {num}
                 </button>
               ))}
             </div>
          </div>

          <div>
             <label className="block text-sm font-semibold text-stone-700 mb-2">
              {t.applianceLabel}
            </label>
            <div className="relative">
              <select
                value={appliance}
                onChange={(e) => setAppliance(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-chef-500 focus:ring-2 focus:ring-chef-200 outline-none transition-all bg-white appearance-none cursor-pointer"
                disabled={isLoading}
              >
                 {Object.keys(t.appliances).map((key) => (
                   <option key={key} value={key}>
                     {t.appliances[key as keyof typeof t.appliances]}
                   </option>
                 ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-chevron-down text-stone-400 text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Dietary */}
        <div>
           <label className="block text-sm font-semibold text-stone-700 mb-2">
            {t.dietaryLabel}
           </label>
           <div className="flex flex-wrap gap-2">
             {Object.keys(t.dietary).map((key) => {
               const isSelected = dietary.includes(key);
               return (
                 <button
                   key={key}
                   type="button"
                   onClick={() => toggleDietary(key)}
                   disabled={isLoading}
                   className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                     isSelected 
                       ? 'bg-chef-600 border-chef-600 text-white shadow-sm' 
                       : 'bg-white border-stone-200 text-stone-600 hover:border-chef-300'
                   }`}
                 >
                   {isSelected && <i className="fas fa-check mr-1"></i>}
                   {t.dietary[key as keyof typeof t.dietary]}
                 </button>
               )
             })}
           </div>
        </div>

        <Button 
          type="submit" 
          isLoading={isLoading} 
          className="w-full mt-4"
        >
          <i className="fas fa-wand-magic-sparkles"></i>
          {t.generateBtn}
        </Button>
      </form>
    </div>
  );
};

export default RecipeForm;