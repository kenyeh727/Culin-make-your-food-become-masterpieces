import React, { useState, useEffect, useRef } from 'react';
import { Recipe, ImageSize, Language } from '../types';
import Button from './Button';
import { generateDishImage, ensureApiKey } from '../services/geminiService';
import { translations } from '../translations';

interface RecipeDisplayProps {
  recipes: Recipe[];
  onReset: () => void;
  lang: Language;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipes, onReset, lang }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  
  const recipe = recipes[activeIndex];
  const t = translations[lang];

  const handleGenerateImage = async (index: number) => {
    if (loadingImages[index] || generatedImages[index]) return;

    setLoadingImages(prev => ({ ...prev, [index]: true }));
    setError(null);
    try {
      // Use the recipe at the specific index
      const targetRecipe = recipes[index];
      const imageUrl = await generateDishImage(targetRecipe.title, targetRecipe.description, '1K');
      setGeneratedImages(prev => ({ ...prev, [index]: imageUrl }));
    } catch (err) {
      setError(t.errorImage);
      console.error(err);
    } finally {
      setLoadingImages(prev => ({ ...prev, [index]: false }));
    }
  };

  // Automatically generate image for the active recipe if missing
  useEffect(() => {
    if (!generatedImages[activeIndex] && !loadingImages[activeIndex]) {
      handleGenerateImage(activeIndex);
    }
  }, [activeIndex, recipes]);

  const openVideoLink = () => {
    const query = encodeURIComponent(recipe.videoSearchQuery || recipe.title + " recipe");
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this recipe for ${recipe.title}: ${recipe.description}\n\nIngredients: ${recipe.ingredients.join(', ')}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      // Fallback: Copy to clipboard
      const text = `${recipe.title}\n\n${recipe.description}\n\nIngredients:\n${recipe.ingredients.join('\n')}\n\nInstructions:\n${recipe.instructions.join('\n')}`;
      navigator.clipboard.writeText(text);
      alert(t.copiedToClipboard || 'Recipe copied to clipboard!');
    }
  };

  const isGeneratingImg = loadingImages[activeIndex] || false;
  const currentImage = generatedImages[activeIndex];
  const isImgLoaded = imageLoaded[activeIndex] || false;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      
      {/* Recipe Tabs (if multiple) */}
      {recipes.length > 1 && (
        <div className="flex justify-center mb-6 gap-2">
          {recipes.map((r, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`px-6 py-2 rounded-full font-serif font-bold text-sm transition-all shadow-sm ${
                activeIndex === idx
                  ? 'bg-chef-600 text-white shadow-chef-600/30'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              {t.tabDish} {idx + 1}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
        {/* Header Image Area */}
        <div className="relative h-64 md:h-80 bg-stone-200 flex items-center justify-center overflow-hidden group">
          {currentImage ? (
            <img 
              src={currentImage} 
              alt={recipe.title} 
              onLoad={() => setImageLoaded(prev => ({ ...prev, [activeIndex]: true }))}
              className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isImgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <div className="text-center p-6 w-full h-full flex flex-col items-center justify-center bg-stone-100">
               {isGeneratingImg ? (
                  <div className="flex flex-col items-center text-stone-500">
                    <div className="w-10 h-10 border-4 border-chef-200 border-t-chef-600 rounded-full animate-spin mb-3"></div>
                    <p className="text-sm font-medium animate-pulse">{t.visualizeTitle}</p>
                  </div>
               ) : (
                 <div className="text-center">
                   <div className="mb-4 text-stone-300">
                     <i className="fas fa-image text-4xl"></i>
                   </div>
                   {error ? (
                      <div className="text-red-500 mb-2">{error}</div>
                   ) : null}
                   <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => handleGenerateImage(activeIndex)}
                      isLoading={isGeneratingImg}
                      className="mx-auto"
                   >
                     <i className="fas fa-sync-alt mr-2"></i>
                     {t.generatePhoto}
                   </Button>
                 </div>
               )}
            </div>
          )}
          
          {/* Back Button Overlay */}
          <button 
            onClick={onReset}
            className="absolute top-4 left-4 bg-white/90 hover:bg-white p-2 px-4 rounded-full shadow-lg text-stone-800 font-medium text-sm backdrop-blur-sm transition-all z-10"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            {t.newRecipe}
          </button>
        </div>

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-stone-100 pb-8">
            <div>
              <div className="flex gap-2 mb-3">
                <span className="bg-chef-50 text-chef-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {t.cuisines[recipe.cuisine as keyof typeof t.cuisines] || recipe.cuisine}
                </span>
                <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {t.difficulties[recipe.difficulty as keyof typeof t.difficulties] || recipe.difficulty}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">{recipe.title}</h1>
              <p className="text-lg text-stone-600 italic leading-relaxed">{recipe.description}</p>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="flex flex-shrink-0 items-center gap-2 text-stone-500 bg-stone-50 px-5 py-3 rounded-xl">
                <i className="far fa-clock text-xl"></i>
                <span className="font-semibold text-lg">{recipe.cookingTime}</span>
              </div>
              
              <button 
                onClick={openVideoLink}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-red-600/20"
              >
                <i className="fab fa-youtube text-xl"></i>
                <span>{t.watchVideoBtn}</span>
              </button>

              <div className="flex gap-3">
                <button 
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl font-semibold transition-colors"
                >
                    <i className="fas fa-share-alt"></i>
                    <span>{t.shareBtn}</span>
                </button>
                
                <button 
                    onClick={onReset}
                    className="flex-1 flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 px-4 py-3 rounded-xl font-semibold transition-colors"
                >
                    <i className="fas fa-redo"></i>
                    <span>{t.tryAgainBtn}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Ingredients Column */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-chef-100 text-chef-600 flex items-center justify-center mr-3 text-sm">
                  <i className="fas fa-basket-shopping"></i>
                </span>
                {t.ingredientsTitle}
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start text-stone-700 pb-3 border-b border-stone-50 last:border-0">
                    <i className="fas fa-check text-chef-500 mt-1 mr-3 text-xs"></i>
                    <span className="leading-snug">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Column */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-chef-100 text-chef-600 flex items-center justify-center mr-3 text-sm">
                  <i className="fas fa-fire-burner"></i>
                </span>
                {t.instructionsTitle}
              </h3>
              <div className="space-y-6">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-stone-700 leading-relaxed mt-1">{step}</p>
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              {recipe.tips && (
                <div className="mt-10 bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                    <i className="fas fa-lightbulb mr-2"></i> {t.chefTip}
                  </h4>
                  <p className="text-yellow-900/80 italic">{recipe.tips}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;