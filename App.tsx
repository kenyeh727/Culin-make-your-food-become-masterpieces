import React, { useState, useEffect } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import ChatBot from './components/ChatBot';
import { Recipe, Language, RecipePreferences } from './types';
import { generateRecipe, ensureApiKey } from './services/geminiService';
import { translations } from './translations';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appReady, setAppReady] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  // Initial check for high-tier access if needed, or just standard load
  useEffect(() => {
    // We could force key selection here, but let's allow browsing and only force on generation
    setAppReady(true);
  }, []);

  const handleGenerateRecipe = async (prefs: RecipePreferences) => {
    setIsLoading(true);
    setError(null);
    try {
      const newRecipes = await generateRecipe(prefs, lang);
      setRecipes(newRecipes);
    } catch (err) {
      console.error(err);
      setError(t.errorGen);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecipes(null);
    setError(null);
  };

  const toggleLanguage = () => {
    setLang(prev => {
      if (prev === 'en') return 'zh-TW';
      if (prev === 'zh-TW') return 'zh-CN';
      if (prev === 'zh-CN') return 'ko';
      return 'en';
    });
  };

  const getLangLabel = (l: Language) => {
    switch(l) {
      case 'en': return 'EN';
      case 'zh-TW': return '繁體';
      case 'zh-CN': return '简体';
      case 'ko': return '한국어';
      default: return 'EN';
    }
  };

  if (!appReady) return null;

  return (
    <div className="min-h-screen relative font-sans selection:bg-chef-200 overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80")',
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-stone-50/90 backdrop-blur-[2px]"></div>

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
             <i className="fas fa-utensils text-chef-600 text-xl"></i>
             <span className="text-xl font-serif font-bold text-stone-900">{t.appTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full text-sm font-semibold text-stone-600 transition-colors w-24 justify-center"
            >
              <i className="fas fa-globe text-stone-400"></i>
              <span>{getLangLabel(lang)}</span>
            </button>
            
            <button 
              onClick={() => ensureApiKey()}
              className="text-xs font-semibold text-stone-500 hover:text-chef-600 transition-colors hidden sm:block"
            >
              {t.connectKey}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl flex items-center shadow-sm">
            <i className="fas fa-exclamation-circle mr-3"></i>
            {error}
          </div>
        )}

        {recipes ? (
          <RecipeDisplay recipes={recipes} onReset={handleReset} lang={lang} />
        ) : (
          <div className="flex flex-col items-center">
             <div className="text-center mb-12 max-w-2xl bg-white/60 p-8 rounded-3xl backdrop-blur-sm shadow-sm border border-white/50">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 leading-tight">
                  {t.heroTitle} <span className="text-chef-600">{t.heroTitleHighlight}</span>.
                </h1>
                <p className="text-lg text-stone-600">
                  {t.heroDesc}
                </p>
             </div>
             <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} lang={lang} />
             
             {/* Features Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl">
                <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-stone-100 text-center hover:transform hover:scale-105 transition-transform duration-300">
                   <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                     <i className="fas fa-bolt"></i>
                   </div>
                   <h3 className="font-serif font-bold text-lg mb-2">{t.features.instant.title}</h3>
                   <p className="text-stone-600 text-sm">{t.features.instant.desc}</p>
                </div>
                <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-stone-100 text-center hover:transform hover:scale-105 transition-transform duration-300">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                     <i className="fas fa-image"></i>
                   </div>
                   <h3 className="font-serif font-bold text-lg mb-2">{t.features.visual.title}</h3>
                   <p className="text-stone-600 text-sm">{t.features.visual.desc}</p>
                </div>
                <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-stone-100 text-center hover:transform hover:scale-105 transition-transform duration-300">
                   <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                     <i className="fas fa-comments"></i>
                   </div>
                   <h3 className="font-serif font-bold text-lg mb-2">{t.features.chat.title}</h3>
                   <p className="text-stone-600 text-sm">{t.features.chat.desc}</p>
                </div>
             </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-200/50 bg-white/60 backdrop-blur-sm mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-stone-500 text-sm">
          &copy; {new Date().getFullYear()} {t.appTitle}. Powered by Google Gemini.
        </div>
      </footer>

      {/* Floating Chat */}
      <ChatBot lang={lang} />
    </div>
  );
};

export default App;